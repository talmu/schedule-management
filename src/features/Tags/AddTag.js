import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const AddTag = ({ close }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/add-tag");
    close();
  };
  return (
    <ListItem onClick={handleClick} key="addTag">
      <ListItemIcon>
        <AddCircle color="primary" />
      </ListItemIcon>
      <ListItemText primary="Add Tag" />
    </ListItem>
  );
};

export default AddTag;
