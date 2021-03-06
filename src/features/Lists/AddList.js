import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const AddList = ({ close }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/add-list");
    close();
  };
  return (
    <ListItem onClick={handleClick} key="addList">
      <ListItemIcon>
        <AddCircle color="primary" />
      </ListItemIcon>
      <ListItemText primary="Add List" />
    </ListItem>
  );
};

export default AddList;
