import { useDispatch } from "react-redux";
import { Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { actions } from "../../redux/store";
import ItemTags from "./ItemTags";
import { useParams, useHistory } from "react-router-dom";
import { status } from "../../data/data";

const Item = ({ index, todoList }) => {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const history = useHistory();
  const task = todoList.data[index];
  console.log(todoList);

  const handleCheck = (event) => {
    const newStatus = event.target.checked ? status[2] : status[1];
    dispatch(
      actions.updateTaskStatus({
        listId: listId,
        taskId: index,
        status: newStatus,
      })
    );
  };

  const labelId = `checkbox-list-label-${task.name}`;

  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={task.status === "Done"}
            color="primary"
            inputProps={{ "aria-labelledby": labelId }}
            onChange={handleCheck}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={task.name}></ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => history.push(`/edit-task/${listId}/${index}`)}
          >
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ItemTags todoList={todoList} taskId={index} />
    </div>
  );
};

export default Item;
