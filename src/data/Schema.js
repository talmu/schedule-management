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
    list_id: {
      type: "string",
      ref: "lists",
    },
    status_id: {
      type: "string",
      ref: "status",
    },
    priority_id: {
      type: "string",
      ref: "priority",
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
  },
  // required: [
  //   "name",
  //   "user_id",
  //   "created_at",
  //   "list_id",
  //   "status_id",
  //   "priority_id",
  // ],
  indexes: ["list_id"],
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
    updated_at: {
      type: "string",
    },
  },
  // required: ["name"],
  additionalProperties: true,
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
    updated_at: {
      type: "string",
    },
  },
  // required: ["text"],
  additionalProperties: true,
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
    updated_at: {
      type: "string",
    },
  },
  // required: ["text"],
  additionalProperties: true,
};

export const taskTagsSchema = {
  title: "task tags schema",
  description: "task tags schema",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true,
    },
    task_id: {
      type: "string",
      ref: "todos",
    },
    tag_id: {
      type: "string",
      ref: "tags",
    },
    updated_at: {
      type: "string",
    },
  },
  // required: ["task_id", "tag_id"],
  additionalProperties: true,
};

export const tagsSchema = {
  title: "tags schema",
  description: "tags schema",
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
    updated_at: {
      type: "string",
    },
  },
  // required: ["text"],
  additionalProperties: true,
};

export const subtaskSchema = {
  title: "subtasks schema",
  description: "subtasks schema",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true,
    },
    task_id: {
      type: "string",
      ref: "todos",
    },
    name: {
      type: "string",
    },
    done: {
      type: "boolean",
    },
    updated_at: {
      type: "string",
    },
  },
  additionalProperties: true,
};
