import React, { useState } from "react";
import { Add } from "@material-ui/icons";
import { List, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Item from "./ListItem";
import { status, priority } from "../../data/data";
import formatISO from "date-fns/formatISO";
import ItemDialog from "./ItemDialog";
import { actions } from "../../redux/store";

const TodoList = (props) => {
  const classes = useStyles();
  const today = new Date();
  const formattedDate = formatISO(today, { representation: "date" });

  const [open, setOpen] = useState(false);

  const newTask = {
    name: "",
    status: status[0],
    priority: priority[3],
    notes: "",
    scheduled: formattedDate,
    duration: "02:00",
    reminder: "00:00",
    tags: [],
  };

  const todoList = useSelector((state) => state.todos[state.selectedIndex]);

  const task = useSelector((state) =>
    state.selectedTask !== -1
      ? state.todos[state.selectedIndex].data[state.selectedTask]
      : newTask
  );

  const dispatch = useDispatch();

  const handleDialogOpen = (isOpen) => {
    setOpen(isOpen);
  };

  return (
    <div>
      <List className={classes.root} key="todolist">
        {todoList.data.map((task, index) => {
          return (
            <Item
              key={index.toString()}
              task={task}
              index={index}
              setOpen={handleDialogOpen}
              todoList={todoList}
            />
          );
        })}
      </List>
      <Fab
        key="fab-add"
        color="primary"
        aria-label="add"
        onClick={() => {
          dispatch(actions.selectTask(-1));
          setOpen(true);
        }}
        className={classes.fab}
      >
        <Add />
      </Fab>
      <ItemDialog
        open={open}
        setOpen={handleDialogOpen}
        task={task}
      ></ItemDialog>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default TodoList;
