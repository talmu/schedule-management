import { Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import ItemTags from "./ItemTags";
import { useParams, useHistory } from "react-router-dom";

const Item = ({ todo }) => {
  const { listId } = useParams();
  const history = useHistory();
  const item = todo;

  const handleCheck = async (event) => {
    const updateFunction = (item) => {
      item.status = event.target.checked ? "2" : "1";
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
            checked={todo.status === "2"}
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
