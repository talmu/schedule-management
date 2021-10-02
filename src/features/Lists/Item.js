import { Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import ItemTags from "./ItemTags";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const Item = ({ todo }) => {
  const history = useHistory();
  const [listName, setListName] = useState("");

  useEffect(() => {
    todo.list_id_.then((list) => setListName(list.name));
  }, [todo.list_id_]);

  const handleCheck = async (event) => {
    const newStatus = event.target.checked
      ? "252770a1-26d9-43df-b15a-fafcdc36149a"
      : "22ae1dc5-5a43-423b-83db-d54c95f43bfb";
    await todo.atomicPatch({ status_id: newStatus });
  };

  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.status_id === "252770a1-26d9-43df-b15a-fafcdc36149a"}
            color="primary"
            onChange={handleCheck}
          />
        </ListItemIcon>
        <ListItemText primary={todo.name} secondary={listName} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() =>
              history.push(`/edit-task/${todo.list_id}/${todo.id}`)
            }
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
