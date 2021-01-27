import { useDispatch } from "react-redux";
import { Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { actions } from "../../redux/store";
import ItemTags from "./ItemTags";
import { useParams, useHistory } from "react-router-dom";
import { status } from "../../data/data";
import { useRxDocument } from "rxdb-hooks";

const Item = ({ todo }) => {
  // const dispatch = useDispatch();
  // const task = todoList[index];
  // const { result: item } = useRxDocument("todos", todo.id);
  const item = todo;

  const { listId } = useParams();
  const history = useHistory();

  const handleCheck = async (event) => {
    // const newStatus = event.target.checked ? status[2] : status[1];
    // dispatch(
    //   actions.updateTaskStatus({
    //     listId: listId,
    //     taskId: index,
    //     status: newStatus,
    //   })
    // );

    const updateFunction = (item) => {
      item.status = event.target.checked ? status[2] : status[1];
    };

    await item.atomicUpdate(updateFunction);
  };

  const labelId = `checkbox-list-label-${todo.name}`;

  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.status === "Done"}
            color="primary"
            inputProps={{ "aria-labelledby": labelId }}
            onChange={handleCheck}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={todo.name}></ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => history.push(`/edit-task/${listId}/${todo.id}`)}
          >
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {/* <ItemTags todo={todo} /> */}
    </div>
  );
};

export default Item;
