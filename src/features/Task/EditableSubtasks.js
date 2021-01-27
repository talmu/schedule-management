import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { TextField, Checkbox } from "@material-ui/core";
import { SubdirectoryArrowRight, Close, Check } from "@material-ui/icons";
import { useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/store";
import { useParams } from "react-router-dom";

const EditableSubtasks = ({ control }) => {
  const [clicked, setClicked] = useState(false);
  const [subtask, setSubtask] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const { listId, taskId } = useParams();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const handleConfirm = () => {
    setClicked(false);
    if (subtask) {
      append({ name: subtask, done: false });
      setSubtask("");
    }
  };

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
                      onChange={handleCheckboxChange(index)}
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

// <Controller
//   name="subtasks"
//   control={props.control}
//   render={({ onChange, value }) => (
//     <List onChange={onChange}>
//       {tempSubtasks.map((subtask, index) => {
//         return (
//           <ListItem key={index.toString()}>
//             <ListItemText primary={subtask.name} />
//             <ListItemSecondaryAction>
//               <IconButton edge="end" onClick={handleCancle(index)}>
//                 <Close />
//               </IconButton>
//             </ListItemSecondaryAction>
//           </ListItem>
//         );
//       })}
//       {clicked ? newSubtask : ""}
//       <ListItem onClick={() => setClicked(true)} key="addSubtask">
//         <ListItemIcon>
//           <SubdirectoryArrowRight />
//         </ListItemIcon>
//         <ListItemText primary="Add Subtask" />
//       </ListItem>
//     </List>
//   )}
// />
