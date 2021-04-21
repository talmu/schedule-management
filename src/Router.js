import { Switch, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TodoList from "./pages/TodoList";
import Main from "./pages/Main";
import TasksTag from "./pages/TasksTag";
import AddListPage from "./pages/AddListPage";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/list/add-list">
        <AddListPage />
      </Route>
      <Route exact path="/tag/tasks-tag/:tagId">
        <TasksTag />
      </Route>
      <Route exact path="/task/add-task/:listId">
        <AddTask />
      </Route>
      <Route exact path="/task/edit-task/:listId/:taskId">
        <EditTask />
      </Route>
      <Route exact path="/list/:listId">
        <TodoList />
      </Route>
      <Route exact path="/">
        <Main />
      </Route>
    </Switch>
  );
};

export default Router;
