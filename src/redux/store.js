import { configureStore, createSlice } from "@reduxjs/toolkit";
import { tasksData, status } from "../data/data";

const selectList = (state, { payload }) => {
  state.selectedIndex = payload.index;
  state.title = state.todos[state.selectedIndex].subject + " List";
};

const addTask = (state, action) => {
  const { newTask } = action.payload;
  state.todos[state.selectedIndex].data.push(newTask);
};

// const editTask = (state, { payload }) => {
//   state.todos[state.selectedIndex].data[payload.taskIndex] =
//     payload.modifiedTask;
// };

const addChecked = (state, { payload }) => {
  state.todos[state.selectedIndex].data[payload.taskIndex].status = status[2];
};

const removeChecked = (state, { payload }) => {
  state.todos[state.selectedIndex].data[payload.taskIndex].status = status[0];
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: tasksData,
    selectedIndex: 0,
    title: "Math List",
  },
  reducers: {
    selectList,
    addTask,
    // editTask,
    addChecked,
    removeChecked,
  },
});

export const store = configureStore({
  reducer: todoSlice.reducer,
});

export const { actions } = todoSlice;
