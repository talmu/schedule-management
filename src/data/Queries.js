export const subscriptionQuery = (collection) => {
  const queries = {
    lists: `subscription onListChanged {
              lists {
                id
                name
              }       
            }`,
    status: `subscription onStatusChanged {
              status {
                id
                text
              }       
            }`,
    priority: `subscription onPriorityChanged {
                priority {
                  id
                  text
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
                user_id
              }       
            }`,
    task_tags: `subscription onTaskTagsChanged {
                    task_tags {
                      id
                      task_id
                      tag_id
                    }
                  }`,
    tags: `subscription onTagsChanged {
            tags {
              id
              text
            }       
          }`,

    subtasks: `subscription onSubtasksChanged {
                subtasks {
                  id
                  task_id
                  name
                  done
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
                    update_columns: [name]
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
                        update_columns: [text]
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
                          update_columns: [text]
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
                      update_columns: [name, created_at, due, duration, list_id, notes, priority_id, reminder, scheduled, status_id, updated_at]
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
                    update_columns: []
                }){
                returning {
                  task_id
                }
              }
          }`,
    tags: `mutation InsertTag($tag: [tags_insert_input!]!) {
            insert_tags(
              objects: $tag,
              on_conflict: {
                  constraint: tags_pkey,
                  update_columns: [text]
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
                      update_columns: [name, done]
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
              lists{
                id
                name
              }
          }`,
    status: `{
              status{
                id
                text
              }
            }`,
    priority: `{
                  priority{
                    id
                    text
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
                  user_id
                  due
                  duration
                  notes
                  reminder
                  scheduled
              }
            }`,
    task_tags: `{
                  task_tags{
                    id
                    task_id
                    tag_id
                  }
              }`,
    tags: `{
            tags{
              id
              text
            }
          }`,
    subtasks: `{
                subtasks{
                    id
                    task_id
                    name
                    done
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
