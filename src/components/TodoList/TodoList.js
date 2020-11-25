import React, { useState } from "react";
import { Add, Edit } from "@material-ui/icons";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import { IconButton, Fab } from "@material-ui/core";
import AddItemDialog from "./AddItemDialog";
import EditItemDialog from "./EditItemDialog";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../redux/store";

function TodoList(props) {
  const classes = useStyles();

  const todoList = useSelector((state) => state.todos[state.selectedIndex]);
  const dispatch = useDispatch();

  const [isAddOpen, setAddOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [checked, setChecked] = useState([0]);

  const handleCheckboxClick = (task) => () => {
    const checkedIndex = checked.indexOf(task);
    const newChecked = [...checked];
    const taskIndex = todoList.data.indexOf(task);

    if (checkedIndex === -1) {
      newChecked.push(task);
      dispatch(actions.addChecked({ taskIndex }));
    } else {
      newChecked.splice(checkedIndex, 1);
      dispatch(actions.removeChecked({ taskIndex }));
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <List className={classes.root}>
        {todoList.data.map((task) => {
          const labelId = `checkbox-list-label-${task.name}`;

          return (
            <ListItem
              key={task.id}
              role={undefined}
              dense
              button
              onClick={handleCheckboxClick(task)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(task) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                className="text-wrap"
                id={labelId}
                primary={task.name}
              ></ListItemText>
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => setEditOpen(true)}>
                  <Edit />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setAddOpen(true)}
        className={classes.fab}
      >
        <Add />
      </Fab>

      <AddItemDialog open={isAddOpen} setOpen={setAddOpen}></AddItemDialog>
      <EditItemDialog open={isEditOpen} setOpen={setEditOpen}></EditItemDialog>
    </div>
  );
}

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
