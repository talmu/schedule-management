import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { actions } from "../../redux/store";
import ItemTags from "./ItemTags";

const Item = (props) => {
  const [checked, setChecked] = useState([0]);
  const dispatch = useDispatch();

  const handleCheckboxClick = () => {
    const checkedIndex = checked.indexOf(props.task);
    const newChecked = [...checked];
    const taskIndex = props.todoList.data.indexOf(props.task);

    if (checkedIndex === -1) {
      newChecked.push(props.task);
      dispatch(actions.addChecked({ taskIndex }));
    } else {
      newChecked.splice(checkedIndex, 1);
      dispatch(actions.removeChecked({ taskIndex }));
    }

    setChecked(newChecked);
  };
  const labelId = `checkbox-list-label-${props.task.name}`;

  return (
    <div>
      <ListItem dense button onClick={handleCheckboxClick}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(props.task) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText
          className="text-wrap"
          id={labelId}
          primary={props.task.name}
        ></ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => {
              console.log(props.index);
              dispatch(actions.selectTask(props.index));
              props.setOpen(true);
            }}
          >
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ItemTags index={props.index} />
    </div>
  );
};

export default Item;
