import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { SubdirectoryArrowRight, Close, Check } from "@material-ui/icons";
import { Controller, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

const AddSubtask = ({ control }) => {
  const [clicked, setClicked] = useState(false);
  const [subtask, setSubtask] = useState("");
  const { taskId } = useParams();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });
  const classes = useStyles();

  console.log(fields);

  const handleCheckClick = () => {
    setClicked(false);
    if (subtask) {
      append({ name: subtask, done: false });
      setSubtask("");
    }
  };

  const newSubtask = (
    <div>
      <TextField
        className={classes.marginTopBottom}
        label="Subtask"
        onChange={(e) => setSubtask(e.target.value)}
        defaultValue=""
      ></TextField>
      <IconButton edge="end" onClick={handleCheckClick}>
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
      <List component="div">
        {fields.map((subtask, index) => {
          const id = `${taskId}-${index}`;
          return (
            <ListItem className={classes.nestedSubtask} key={id}>
              <ListItemText primary={subtask.name} />
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

export default AddSubtask;

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
