import { Switch, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TodoList from "./pages/TodoList";
import Main from "./pages/Main";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/add-task/:listId">
        <AddTask />
      </Route>
      <Route exact path="/edit-task/:listId/:taskId">
        <EditTask />
      </Route>
      <Route exact path="/:listId">
        <TodoList />
      </Route>
      <Route exact path="/">
        <Main />
      </Route>
    </Switch>
  );
};

export default Router;
