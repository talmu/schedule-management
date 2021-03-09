import { useState } from "react";
import { Typography, Toolbar, IconButton } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { Menu, Edit, Delete } from "@material-ui/icons";
import { AppBar } from "@material-ui/core";
import { useRxDB, useRxDocument } from "rxdb-hooks";
import DeleteDialog from "./DeleteDialog";
import Loading from "./Loading";

const Bar = ({ openMenu }) => {
  const classes = useStyles();
  const db = useRxDB();
  const { listId } = useParams();

  console.log(listId);

  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => setOpen(!open);

  const deleteList = async () => {
    const query = db.todos.find().where("list_id").equals(listId);
    const todos = await query.exec();
    todos.map((todo) => deleteTodo(todo));
  };

  const deleteTodo = async (todo) => {
    deleteTags(todo);
    deleteSubtasks(todo);
    todo.remove();
  };

  const deleteTags = async (todo) => {
    const query = db.task_tags.find().where("task_id").equals(todo.id);
    const task_tags = await query.exec();
    await Promise.all(task_tags.map((task_tag) => task_tag.remove()));
  };

  const deleteSubtasks = async (todo) => {
    const query = db.subtasks.find().where("task_id").equals(todo.id);
    const subtasks = await query.exec();
    await Promise.all(subtasks.map((subtask) => subtask.remove()));
  };

  const ListTitle = () => {
    const { listId } = useParams();
    const { result: list } = useRxDocument("lists", listId);
    return list ? list.name : "Loading";
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={openMenu}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.typography}>
          <Switch>
            <Route exact path="/add-task/:listId">
              Add Task
            </Route>
            <Route exact path="/edit-task/:listId/:taskId">
              Edit Task
            </Route>
            <Route exact path="/:listId">
              <ListTitle />
            </Route>
            <Route exact path="/">
              All
            </Route>
          </Switch>
        </Typography>
        <IconButton
          disabled={!listId}
          color="inherit"
          aria-label="delete list"
          onClick={handleDeleteClick}
        >
          <Delete />
        </IconButton>
        <DeleteDialog
          open={open}
          handleDeleteClick={handleDeleteClick}
          deleteFunc={deleteList}
        />
        <IconButton color="inherit" aria-label="edit list" disabled={!listId}>
          <Edit />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  typography: {
    flexGrow: 1,
  },
}));

export default Bar;
