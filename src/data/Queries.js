export const subscriptionQuery = (collection) => {
  const queries = {
    lists: `subscription onListChanged {
              lists {
                id
                name
                updated_at
                deleted
              }       
            }`,
    status: `subscription onStatusChanged {
              status {
                id
                text
                updated_at
                deleted
              }       
            }`,
    priority: `subscription onPriorityChanged {
                priority {
                  id
                  text
                  updated_at
                  deleted
                }       
              }`,
    todos: `subscription onTodoChanged {
              todos {
                id
                name
                created_at
                due
                duration
                list_id
                notes
                priority_id
                reminder
                scheduled
                status_id
                updated_at
                deleted
              }       
            }`,
    task_tags: `subscription onTaskTagsChanged {
                    task_tags {
                      id
                      task_id
                      tag_id
                      updated_at
                      deleted
                    }
                  }`,
    tags: `subscription onTagsChanged {
            tags {
              id
              text
              updated_at
              deleted
            }       
          }`,
    subtasks: `subscription onSubtasksChanged {
                subtasks {
                  id
                  task_id
                  name
                  done
                  updated_at
                  deleted
                }       
              }`,
  };
  return queries[collection];
};

export const pushQuery = (collection) => {
  const queries = {
    lists: `mutation InsertList($list: [lists_insert_input!]!) {
              insert_lists(
                objects: $list,
                on_conflict: {
                    constraint: todo_lists_pkey,
                    update_columns: [name, updated_at, deleted]
              }){
                returning {
                  id
                }
              }
            }`,
    status: `mutation InsertStatus($status: [status_insert_input!]!) {
              insert_status(
                    objects: $status,
                    on_conflict: {
                        constraint: status_pkey,
                        update_columns: [text, deleted, updated_at]
                    }){
                    returning {
                      id
                    }
                  }
            }`,
    priority: `mutation InsertPriority($priority: [priority_insert_input!]!) {
                insert_priority(
                      objects: $priority,
                      on_conflict: {
                          constraint: priority_pkey,
                          update_columns: [text, deleted, updated_at]
                      }){
                      returning {
                        id
                      }
                    }
              }`,
    todos: `mutation InsertTodo($todo: [todos_insert_input!]!) {
              insert_todos(
                  objects: $todo,
                  on_conflict: {
                      constraint: todos_pkey,
                      update_columns: [name, due, duration, notes, priority_id, reminder, scheduled, status_id, updated_at, deleted]
                  }){
                  returning {
                    id
                  }
                }
            }`,

    task_tags: `mutation InsertTaskTag($task_tag: [task_tags_insert_input!]!) {
                    insert_task_tags(
                objects: $task_tag,
                on_conflict: {
                    constraint: task_tags_pkey,
                    update_columns: [deleted,updated_at]
                }){
                returning {
                  id
                  task_id
                }
              }
          }`,
    tags: `mutation InsertTag($tag: [tags_insert_input!]!) {
            insert_tags(
              objects: $tag,
              on_conflict: {
                  constraint: tags_pkey,
                  update_columns: [text, deleted, updated_at]
              }){
              returning {
                id
              }
            }
          }`,
    subtasks: `mutation InsertSubtask($subtask: [subtasks_insert_input!]!) {
                insert_subtasks(
                  objects: $subtask,
                  on_conflict: {
                      constraint: subtasks_pkey,
                      update_columns: [name, done, deleted, updated_at]
                  }){
                  returning {
                    id
                  }
                }
              }`,
  };
  return queries[collection];
};

export const pullQuery = (collection, batchSize, doc) => {
  const queries = {
    lists: `{
              lists(
                where: {
                  updated_at: {_gt: "${doc.updated_at}"},
                },
                limit: ${batchSize},
                order_by: [{updated_at: asc}, {id: asc}]
              ){
                id
                name
                updated_at
                deleted
              }
          }`,
    status: `{
              status(
                where: {
                  updated_at: {_gt: "${doc.updated_at}"},
                },
                limit: ${batchSize},
                order_by: [{updated_at: asc}, {id: asc}]
              ){
                id
                text
                updated_at
                deleted
              }
            }`,
    priority: `{
                  priority(
                    where: {
                      updated_at: {_gt: "${doc.updated_at}"},
                    },
                    limit: ${batchSize},
                    order_by: [{updated_at: asc}, {id: asc}]
                  ){
                    id
                    text
                    updated_at
                    deleted
                  }
              }`,
    todos: `{
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
                  due
                  duration
                  notes
                  reminder
                  scheduled
                  deleted
              }
            }`,
    task_tags: `{
                  task_tags(
                    where: {
                      updated_at: {_gt: "${doc.updated_at}"},
                    },
                    limit: ${batchSize},
                    order_by: [{updated_at: asc}, {id: asc}]
                  )
                    {
                    id
                    task_id
                    tag_id
                    updated_at
                    deleted
                  }
              }`,
    tags: `{
            tags(
              where: {
                updated_at: {_gt: "${doc.updated_at}"},
              },
              limit: ${batchSize},
              order_by: [{updated_at: asc}, {id: asc}]
            ){
              id
              text
              updated_at
              deleted
            }
          }`,
    subtasks: `{
                subtasks(
                  where: {
                    updated_at: {_gt: "${doc.updated_at}"},
                  },
                  limit: ${batchSize},
                  order_by: [{updated_at: asc}, {id: asc}]
                ){
                    id
                    task_id
                    name
                    done
                    updated_at
                    deleted
                  }
                }`,
  };
  return queries[collection];
};

export const variable = (collection) => {
  const variables = {
    todos: "todo",
    lists: "list",
    priority: "priority",
    status: "status",
    task_tags: "task_tag",
    tags: "tag",
    subtasks: "subtask",
  };

  return variables[collection];
};
