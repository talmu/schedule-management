export const todoSchema = {
  title: "todo schema",
  description: "todo schema",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true,
    },
    name: {
      type: "string",
    },
    created_at: {
      type: "string",
    },
    updated_at: {
      type: "string",
    },
    user_id: {
      type: "string",
    },
    list_id: {
      type: "number",
    },
    status_id: {
      type: "number",
    },
    priority_id: {
      type: "number",
    },
    notes: {
      type: "string",
    },
    scheduled: {
      type: "string",
    },
    duration: {
      type: "string",
    },
    due: {
      type: "string",
    },
    reminder: {
      type: "string",
    },
    subtasks: {
      type: "array",
      items: {
        type: "object",
        uniqueItems: true,
        properties: {
          id: {
            type: "integer",
          },
          task_id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          done: {
            type: "boolean",
          },
        },
      },
    },
    task_tags: {
      type: "array",
      items: {
        type: "object",
        uniqueItems: true,
        properties: {
          id: {
            type: "integer",
          },
          task_id: {
            type: "string",
          },
          tag_id: {
            type: "integer",
          },
        },
      },
    },
  },
  required: [
    "name",
    "user_id",
    "created_at",
    "list_id",
    "status_id",
    "priority_id",
  ],
  additionalProperties: true,
};

export const listSchema = {
  title: "lists schema",
  description: "lists schema",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true,
    },
    name: {
      type: "string",
    },
  },
  required: ["name"],
};

export const statusSchema = {
  title: "status schema",
  description: "statuses schema",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true,
    },
    text: {
      type: "string",
    },
  },
  required: ["text"],
};

export const prioritySchema = {
  title: "priority schema",
  description: "priorities schema",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true,
    },
    text: {
      type: "string",
    },
  },
  required: ["text"],
};

const data = {
  data: {
    todos: [
      {
        id: "ba5da36a-9044-4cd7-a521-6a6ab6380a3a",
        name: "Solve Targil 1",
        status_id: 1,
        created_at: "2021-01-26T08:54:34.533207+00:00",
        updated_at: "2021-01-26T08:54:34.533207",
        priority_id: 4,
        list_id: 1,
        user_id: "1",
        due: "2021-01-27T08:54:34.533207",
        duration: "02:00:00",
        notes: "check",
        reminder: "01:00:00",
        scheduled: "2021-01-26",
      },
      {
        id: "b32716b5-e98f-429e-9191-4b10ab57affd",
        name: "Solve Targil 1",
        status_id: 1,
        created_at: "2021-01-26T08:55:01.98027+00:00",
        updated_at: "2021-01-26T08:55:01.98027",
        priority_id: 4,
        list_id: 2,
        user_id: "1",
        due: "2021-01-27T08:55:01.98027",
        duration: "02:00:00",
        notes: "check",
        reminder: "01:00:00",
        scheduled: "2021-01-26",
      },
      {
        id: "95e67cb1-a960-47de-bebe-79e2f0f9d44a",
        name: "Solve Targil 1",
        status_id: 1,
        created_at: "2021-01-26T08:55:19.736364+00:00",
        updated_at: "2021-01-26T08:55:19.736364",
        priority_id: 4,
        list_id: 3,
        user_id: "1",
        due: "2021-01-27T08:55:19.736364",
        duration: "02:00:00",
        notes: "check",
        reminder: "01:00:00",
        scheduled: "2021-01-26",
      },
      {
        id: "ae7c7bfd-c8ee-496c-93e6-3c8529cae5e0",
        name: "Solve Targil 1",
        status_id: 1,
        created_at: "2021-01-26T08:55:25.71512+00:00",
        updated_at: "2021-01-26T08:55:25.71512",
        priority_id: 4,
        list_id: 4,
        user_id: "1",
        due: "2021-01-27T08:55:25.71512",
        duration: "02:00:00",
        notes: "check",
        reminder: "01:00:00",
        scheduled: "2021-01-26",
      },
    ],
  },
};
