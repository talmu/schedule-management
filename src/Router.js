import { Switch, Route, Redirect } from "react-router-dom";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TodoList from "./pages/TodoList";
import { Provider } from "rxdb-hooks";

const Router = () => {
  return (
    <Switch>
      <Route path="/add-task/:listId">
        <AddTask />
      </Route>
      <Route exact path="/edit-task/:listId/:taskId">
        <EditTask />
      </Route>
      <Route exact path="/:listId">
        <TodoList />
      </Route>
      <Redirect from="/" to="/1" />
    </Switch>
  );
};

export default Router;
