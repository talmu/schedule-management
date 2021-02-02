import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { TextField, Checkbox } from "@material-ui/core";
import { SubdirectoryArrowRight, Close, Check } from "@material-ui/icons";
import { useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const EditableSubtasks = ({ control, task }) => {
  const [clicked, setClicked] = useState(false);
  const [subtask, setSubtask] = useState("");

  const classes = useStyles();
  const { taskId } = useParams();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const handleConfirm = () => {
    setClicked(false);
    if (subtask) {
      taskId
        ? append({ id: uuidv4(), name: subtask, done: false })
        : append({
            id: uuidv4(),
            name: subtask,
            done: false,
          });
      setSubtask("");
    }
  };

  const handleChange = (subtask) => async (event) => {
    await subtask.atomicUpdate((item) => (item.done = event.target.checked));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleConfirm();
  };

  const newSubtask = (
    <div>
      <TextField
        name="newSubtask"
        className={classes.marginTopBottom}
        label="Subtask"
        onChange={(e) => setSubtask(e.target.value)}
        onKeyPress={handleKeyPress}
        defaultValue=""
      ></TextField>
      <IconButton edge="end" onClick={handleConfirm}>
        <Check />
      </IconButton>
      <IconButton
        edge="end"
        onClick={() => {
          setClicked(false);
          setSubtask("");
        }}
      >
        <Close />
      </IconButton>
    </div>
  );

  return (
    <div>
      <List>
        {fields.map((subtask, index) => {
          return (
            <ListItem className={classes.nestedSubtask} key={subtask.id}>
              <Controller
                name={`subtasks[${index}].done`}
                control={control}
                defaultValue={subtask.done}
                render={() => (
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={subtask.done}
                      color="primary"
                      onChange={handleChange(subtask)}
                    />
                  </ListItemIcon>
                )}
              />
              <Controller
                name={`subtasks[${index}].name`}
                control={control}
                defaultValue={subtask.name}
                render={() => <ListItemText primary={subtask.name} />}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => remove(index)}>
                  <Close />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      {clicked ? newSubtask : ""}
      <List>
        <ListItem onClick={() => setClicked(true)} key="addSubtask">
          <ListItemIcon>
            <SubdirectoryArrowRight />
          </ListItemIcon>
          <ListItemText primary="Add Subtask" />
        </ListItem>
      </List>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  marginTopBottom: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

export default EditableSubtasks;
