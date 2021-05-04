import { Switch, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TodoList from "./pages/TodoList";
import Main from "./pages/Main";
import TasksTag from "./pages/TasksTag";
import AddListPage from "./pages/AddListPage";
import AddTagPage from "./pages/AddTagPage";
import EditListPage from "./pages/EditListPage";
import EditTagPage from "./pages/EditTagPage";
import DeleteListPage from "./pages/DeleteListPage";
import DeleteTagPage from "./pages/DeleteTagPage";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/list/:listId">
        <TodoList />
      </Route>
      <Route exact path="/add-list">
        <AddListPage />
      </Route>
      <Route exact path="/edit-list/:listId">
        <EditListPage />
      </Route>
      <Route exact path="/delete-list/:listId">
        <DeleteListPage />
      </Route>
      <Route exact path="/add-task/:listId">
        <AddTask />
      </Route>
      <Route exact path="/edit-task/:listId/:taskId">
        <EditTask />
      </Route>
      <Route exact path="/tag/:tagId">
        <TasksTag />
      </Route>
      <Route exact path="/add-tag">
        <AddTagPage />
      </Route>
      <Route exact path="/edit-tag/:tagId">
        <EditTagPage />
      </Route>
      <Route exact path="/delete-tag/:tagId">
        <DeleteTagPage />
      </Route>
    </Switch>
  );
};

export default Router;
