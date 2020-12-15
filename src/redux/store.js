import { configureStore, createSlice } from "@reduxjs/toolkit";
import { tasksData, status } from "../data/data";

const selectList = (state, { payload }) => {
  state.selectedIndex = payload.index;
  state.title = state.todos[state.selectedIndex].subject + " List";
};

const addTask = (state, action) => {
  state.todos[state.selectedIndex].data.push(action.payload);
};

const editTask = (state, { payload }) => {
  state.todos[state.selectedIndex].data = [
    ...state.todos[state.selectedIndex].data.slice(0, state.selectedTask),
    { ...payload },
    ...state.todos[state.selectedIndex].data.slice(state.selectedTask + 1),
  ];
};

const addChecked = (state, { payload }) => {
  state.todos[state.selectedIndex].data[payload.taskIndex].status = status[2];
};

const removeChecked = (state, { payload }) => {
  state.todos[state.selectedIndex].data[payload.taskIndex].status = status[0];
};

const addTags = (state, { payload }) => {
  state.tags.push(payload);
};

const selectTask = (state, { payload }) => {
  state.selectedTask = payload;
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: tasksData,
    selectedIndex: 0,
    selectedTask: -1,
    title: "Math List",
    tags: [{ title: "Exam Task" }, { title: "Home Task" }],
  },
  reducers: {
    selectList,
    addTask,
    editTask,
    addChecked,
    removeChecked,
    addTags,
    selectTask,
  },
});

export const store = configureStore({
  reducer: todoSlice.reducer,
});

export const { actions } = todoSlice;
