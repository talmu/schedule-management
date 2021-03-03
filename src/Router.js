import { Switch, Route, Redirect } from "react-router-dom";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TodoList from "./pages/TodoList";

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
      <Redirect from="/" to="/e52b584b-186d-446e-ae08-7aa01c277557" />
    </Switch>
  );
};

export default Router;
