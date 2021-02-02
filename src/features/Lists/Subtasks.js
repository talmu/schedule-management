import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { List, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRxData } from "rxdb-hooks";

const Subtasks = ({ todo }) => {
  const classes = useStyles();
  const { result: subtasks } = useRxData("subtasks", (collection) =>
    collection.find().where("task_id").equals(todo.id)
  );

  const handleChange = (subtask) => async (event) => {
    await subtask.atomicUpdate((item) => (item.done = event.target.checked));
  };

  return (
    <List component="div" disablePadding>
      {subtasks.map((subtask, index) => {
        const id = `${index}-${subtask.name}`;
        return (
          <ListItem className={classes.nestedSubtask} key={id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={subtask.done}
                color="primary"
                onChange={handleChange(subtask)}
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
