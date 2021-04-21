import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const AddList = ({ close }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/list/add-list");
    close();
  };
  return (
    <ListItem onClick={handleClick} key="addList">
      <ListItemIcon>
        <AddCircle />
      </ListItemIcon>
      <ListItemText primary="Add List" />
    </ListItem>
  );
};

export default AddList;
