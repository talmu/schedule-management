import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { TextField, Checkbox } from "@material-ui/core";
import { SubdirectoryArrowRight, Close, Check } from "@material-ui/icons";
import { useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const AddModeSubtasks = ({ control }) => {
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const classes = useStyles();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const handleConfirm = () => {
    setClicked(false);
    name ? append({ name: name, done: false }) : setError(true);
  };

  const newSubtask = (
    <div>
      <TextField
        name="newSubtask"
        className={classes.margin}
        label="Subtask"
        onChange={(e) => {
          if (error) setError(false);
          setName(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleConfirm();
        }}
        defaultValue=""
      ></TextField>
      <IconButton edge="end" onClick={handleConfirm}>
        <Check />
      </IconButton>
      <IconButton edge="end" onClick={() => setClicked(false)}>
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
                render={({ onChange, value }) => (
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value}
                      color="secondary"
                      onChange={(e) => onChange(e.target.checked)}
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
        <ListItem
          onClick={() => {
            setClicked(true);
            setName("");
          }}
          key="addSubtask"
        >
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

export default AddModeSubtasks;
