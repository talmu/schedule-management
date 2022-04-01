import { createRxDatabase, addRxPlugin, removeRxDatabase } from "rxdb";
import {
  todoSchema,
  prioritySchema,
  statusSchema,
  listSchema,
  taskTagsSchema,
  tagsSchema,
  subtaskSchema,
} from "./Schema";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { RxDBValidatePlugin } from "rxdb/plugins/validate";
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { subscriptionQuery, pushQuery, pullQuery, variable } from "./Queries";
import { v4 as uuidv4 } from "uuid";

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBValidatePlugin);
addRxPlugin(RxDBReplicationGraphQLPlugin);
addRxPlugin(require("pouchdb-adapter-idb"));

const syncURL = "https://schedule-management.hasura.app/v1/graphql";

const batchSize = 10;

const pullQueryBuilder = (collection) => (doc) => {
  if (!doc) {
    doc = {
      id: "",
      updated_at: new Date(0).toUTCString(),
    };
  }
  const query = pullQuery(collection, batchSize, doc);

  return {
    query,
    variables: {},
  };
};

const pushQueryBuilder = (collection) => (doc) => {
  const query = pushQuery(collection);
  const variables = {
    [variable(collection)]: doc,
  };
  return {
    query,
    variables,
  };
};

const setupGraphQLReplication = async (db, collection) => {
  const replicationState = db[collection].syncGraphQL({
    url: syncURL,
    headers: {
      "x-hasura-admin-secret":
        process.env.SECRECT_KEY,
    },
    push: {
      batchSize,
      queryBuilder: pushQueryBuilder(collection),
    },
    pull: {
      queryBuilder: pullQueryBuilder(collection),
    },
    live: true,
    liveInterval: 1000 * 60 * 10, // 10 minutes
    deletedFlag: "deleted",
  });

  replicationState.error$.subscribe((err) => {
    console.error("replication error:");
    console.dir(err);
  });
  return replicationState;
};

const setupGraphQLSubscription = (replicationState, collection) => {
  const endpointURL = "wss://schedule-management.hasura.app/v1/graphql";

  const wsClient = new SubscriptionClient(endpointURL, {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          process.env.SECRECT_KEY2,
      },
    },
    timeout: 1000 * 60,
    onConnect: () => {
      console.log("SubscriptionClient.onConnect()");
    },
    connectionCallback: () => {
      console.log("SubscriptionClient.connectionCallback:");
    },
    reconnectionAttempts: 10000,
    inactivityTimeout: 10 * 1000,
    lazy: true,
  });

  const query = subscriptionQuery(collection);

  const ret = wsClient.request({ query });

  ret.subscribe({
    next(data) {
      console.log("subscription emitted => trigger run");
      console.dir(data);
      replicationState.run();
    },
    error(error) {
      console.log("got error:");
      console.dir(error);
    },
  });

  return wsClient;
};

const GraphQLReplicator = async (collectionName, db) => {
  const replicationState = await setupGraphQLReplication(db, collectionName);
  const subscriptionClient = setupGraphQLSubscription(
    replicationState,
    collectionName
  );

  return () => {
    replicationState.cancel();
    subscriptionClient.close();
  };
};

export const RemoteDbReplication = (db) => {
  const cancellations = [];
  const collections = [
    "lists",
    "status",
    "priority",
    "tags",
    "todos",
    "task_tags",
    "subtasks",
  ];

  collections.map((collection) =>
    cancellations.push(GraphQLReplicator(collection, db))
  );

  return () => cancellations.map((cancle) => cancle());
};

export const initializeDB = async () => {
  await removeRxDatabase("todos_rxdb", "idb");
  const db = await createRxDatabase({
    name: "todos_db" + new Date().getTime(),
    adapter: "idb",
  });

  console.log("DatabaseService: created database");
  window["db"] = db; // write to window for debugging

  // add a collection to our db
  await db.addCollections({
    todos: {
      schema: todoSchema,
    },
    status: {
      schema: statusSchema,
    },
    priority: {
      schema: prioritySchema,
    },
    lists: {
      schema: listSchema,
    },
    task_tags: {
      schema: taskTagsSchema,
    },
    tags: {
      schema: tagsSchema,
    },
    subtasks: {
      schema: subtaskSchema,
    },
  });

  db.todos.preInsert(function (plainData) {
    plainData.id = uuidv4();
  }, true);

  db.subtasks.preInsert(function (plainData) {
    plainData.id = uuidv4();
  }, true);

  db.task_tags.preInsert(function (plainData) {
    plainData.id = uuidv4();
  }, true);

  return db;
};
