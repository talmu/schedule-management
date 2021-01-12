import { configureStore, createSlice } from "@reduxjs/toolkit";
import { tasksData } from "../data/data";
// import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

const addTask = (state, { payload }) => {
  state.todos[payload.listId].data.push(payload.task);
};

const editTask = (state, { payload }) => {
  state.todos[payload.listId].data.splice(payload.taskId, 1, {
    ...payload.task,
  });
};

const deleteTask = (state, { payload }) => {
  state.todos[payload.listId].data.splice(payload.taskId, 1);
};

const updateTaskStatus = (state, { payload }) => {
  state.todos[payload.listId].data[payload.taskId].status = payload.status;
};

const addTags = (state, { payload }) => {
  state.tags.push(payload);
};

const updateSubtaskDone = (state, { payload }) => {
  state.todos[payload.listId].data[payload.taskId].subtasks[
    payload.subtaskId
  ].done = payload.done;
};

const addSubtask = (state, { payload }) => {
  state.todos[payload.listId].data[payload.taskId].subtasks.push({
    name: payload.name,
    done: false,
  });
};

const removeSubtask = (state, { payload }) => {
  state.todos[payload.listId].data[payload.taskId].subtasks.splice(
    payload.subtaskId,
    1
  );
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: tasksData,
    tags: [{ title: "Exam Task" }, { title: "Home Task" }],
  },
  reducers: {
    addTask,
    editTask,
    deleteTask,
    updateTaskStatus,
    addTags,
    updateSubtaskDone,
    addSubtask,
    removeSubtask,
  },
});

export const history = createBrowserHistory();

// const rootReducer = (history) =>
//   combineReducers({
//     router: connectRouter(history),
//     todos: todoSlice.reducer,
//   });

// export const store = configureStore({
//   reducer: todoSlice.reducer,
// });

export const store = configureStore({
  reducer:
    // router: connectRouter(history),
    todoSlice.reducer,
  // },
  // middleware: [routerMiddleware(history)],
});

export const { actions } = todoSlice;
