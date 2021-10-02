import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const AddFilter = ({ close }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/add-filter");
    close();
  };
  return (
    <ListItem onClick={handleClick} key="addFilter">
      <ListItemIcon>
        <AddCircle color="primary" />
      </ListItemIcon>
      <ListItemText primary="Add Filter" />
    </ListItem>
  );
};

export default AddFilter;
