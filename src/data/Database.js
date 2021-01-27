import { createRxDatabase, addRxPlugin, removeRxDatabase } from "rxdb";
import { todoSchema, prioritySchema, statusSchema, listSchema } from "./Schema";
// import { RxDBSchemaCheckPlugin } from "rxdb/plugins/schema-check";
// import { RxDBErrorMessagesPlugin } from "rxdb/plugins/error-messages";
// import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { RxDBValidatePlugin } from "rxdb/plugins/validate";
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql";
import { SubscriptionClient } from "subscriptions-transport-ws";

// addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBValidatePlugin);
addRxPlugin(RxDBReplicationGraphQLPlugin);
addRxPlugin(require("pouchdb-adapter-idb"));

// Replace the below with the url to your hasura GraphQL API
const syncURL = "http://localhost:8080/v1/graphql";

const batchSize = 5;
const pullQueryBuilder = (doc) => {
  if (!doc) {
    doc = {
      id: "",
      updated_at: new Date(0).toUTCString(),
    };
  }
  const query = `{
            todos(
                where: {
                  updated_at: {_gt: "${doc.updated_at}"},
                },
                limit: ${batchSize},
                order_by: [{updated_at: asc}, {id: asc}]
            ) {
                id
                name
                status_id
                created_at
                updated_at
                priority_id
                list_id
                user_id
                due
                duration
                notes
                reminder
                scheduled
            }
        }`;
  return {
    query,
    variables: {},
  };
};

const pushQueryBuilder = (doc) => {
  const query = `
        mutation InsertTodo($todo: [todos_insert_input!]!) {
            insert_todos(
                objects: $todo,
                on_conflict: {
                    constraint: todos_pkey,
                    update_columns: [name, created_at, due, duration, list_id, notes, priority_id, reminder, scheduled, status_id, updated_at]
                }){
                returning {
                  id
                }
              }
       }
    `;
  const variables = {
    todo: doc,
  };
  return {
    query,
    variables,
  };
};

const setupGraphQLReplication = async (db) => {
  const replicationState = db.todos.syncGraphQL({
    url: syncURL,
    push: {
      batchSize,
      queryBuilder: pushQueryBuilder,
    },
    pull: {
      queryBuilder: pullQueryBuilder,
    },
    live: true,
    /**
     * Because the websocket is used to inform the client
     * when something has changed,
     * we can set the liveIntervall to a high value
     */
    liveInterval: 1000 * 60 * 10, // 10 minutes
    deletedFlag: "deleted",
  });

  replicationState.error$.subscribe((err) => {
    console.error("replication error:");
    console.dir(err);
  });
  return replicationState;
};

const setupGraphQLSubscription = (replicationState) => {
  // Change this url to point to your hasura graphql url
  const endpointURL = "ws://localhost:8080/v1/graphql";
  const wsClient = new SubscriptionClient(endpointURL, {
    reconnect: true,
    connectionParams: {
      headers: {},
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

  const query = `subscription onTodoChanged {
          todos {
              id
              status_id
              name
          }       
      }`;

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

export const GraphQLReplicator = async (db) => {
  const replicationState = await setupGraphQLReplication(db);
  const subscriptionClient = setupGraphQLSubscription(replicationState);

  return () => {
    replicationState.cancel();
    subscriptionClient.close();
  };
};

export const initializeDB = async () => {
  // await removeRxDatabase("todos_rxdb", "idb");

  const db = await createRxDatabase({
    name: "todos_rxdb",
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
  });

  return db;
};
