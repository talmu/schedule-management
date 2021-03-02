import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { TextField, Checkbox } from "@material-ui/core";
import { SubdirectoryArrowRight, Close, Check } from "@material-ui/icons";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { useRxCollection } from "rxdb-hooks";

const EditModeSubtasks = ({ subtasks }) => {
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState("");
  const [document, setDocument] = useState();
  const [error, setError] = useState(false);
  const subtasksCollection = useRxCollection("subtasks");

  const classes = useStyles();
  const { taskId } = useParams();

  const handleAdd = () => {
    setClicked(true);
    setName("");
    const tempDoc = subtasksCollection.newDocument({
      task_id: taskId,
      name: "",
      done: false,
    });
    setDocument(tempDoc);
  };

  const handleConfirm = async () => {
    setClicked(false);
    if (name) {
      document.name = name;
      document.save();
    } else setError(true);
  };

  const handleChange = (subtask) => async (event) => {
    await subtask.atomicPatch({ done: event.target.checked });
  };

  return (
    <div>
      <List>
        {subtasks.map((subtask) => {
          return (
            <ListItem className={classes.nestedSubtask} key={subtask.id}>
              <ListItemIcon>
                <Checkbox
                  checked={subtask.done}
                  color="primary"
                  onChange={handleChange(subtask)}
                />
              </ListItemIcon>
              <ListItemText primary={subtask.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={async () => await subtask.remove()}
                >
                  <Close />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      {clicked ? (
        <div>
          <TextField
            error={error}
            className={classes.margin}
            label="Subtask"
            onChange={(e) => {
              if (error) setError(false);
              setName(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleConfirm();
            }}
            helperText="Name is a required field"
            defaultValue=""
          ></TextField>
          <IconButton edge="end" onClick={handleConfirm}>
            <Check />
          </IconButton>
          <IconButton edge="end" onClick={() => setClicked(false)}>
            <Close />
          </IconButton>
        </div>
      ) : (
        ""
      )}
      <List>
        <ListItem onClick={handleAdd} key="addSubtask">
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
  margin: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

export default EditModeSubtasks;
