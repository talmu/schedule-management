import { useDispatch } from "react-redux";
import { actions } from "../../redux/store";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { List, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

const Subtasks = ({ todoList, taskId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { listId } = useParams();
  const subtasks = todoList.data[taskId].subtasks;

  const handleCheckboxChange = (index) => (event) => {
    dispatch(
      actions.updateSubtaskDone({
        listId: listId,
        taskId: taskId,
        subtaskId: index,
        done: event.target.checked,
      })
    );
  };

  return (
    <List component="div" disablePadding>
      {subtasks.map((subtask, index) => {
        const id = `${taskId}-${index}`;
        return (
          <ListItem className={classes.nestedSubtask} key={id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={subtask.done}
                color="primary"
                onChange={handleCheckboxChange(index)}
              />
            </ListItemIcon>
            <ListItemText primary={subtask.name} />
          </ListItem>
        );
      })}
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
  nestedSubtask: {
    marginLeft: theme.spacing(6),
  },
}));

export default Subtasks;
