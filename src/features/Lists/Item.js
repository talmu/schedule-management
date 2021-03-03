import { Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import ItemTags from "./ItemTags";
import { useParams, useHistory } from "react-router-dom";
import * as R from "ramda";

const Item = ({ todo, status }) => {
  const { listId } = useParams();
  const history = useHistory();

  const statusDone = R.find(R.propEq("text", "Done"))(status);
  const statusProgress = R.find(R.propEq("text", "In progress"))(status);

  const handleCheck = async (event) => {
    const newStatus = event.target.checked ? statusDone.id : statusProgress.id;
    await todo.atomicPatch({ status_id: newStatus });
  };

  const labelId = `checkbox-list-label-${todo.name}`;

  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.status_id === statusDone.id}
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
