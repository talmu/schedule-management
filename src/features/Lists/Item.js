import { Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import ItemTags from "./ItemTags";
import { useParams, useHistory } from "react-router-dom";

const Item = ({ todo }) => {
  const { listId } = useParams();
  const history = useHistory();

  const handleCheck = async (event) => {
    const newStatus = event.target.checked
      ? "252770a1-26d9-43df-b15a-fafcdc36149a"
      : "22ae1dc5-5a43-423b-83db-d54c95f43bfb";
    await todo.atomicPatch({ status_id: newStatus });
  };

  const labelId = `checkbox-list-label-${todo.name}`;

  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.status_id === "252770a1-26d9-43df-b15a-fafcdc36149a"}
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
      <ItemTags todo={todo} />
    </div>
  );
};

export default Item;
