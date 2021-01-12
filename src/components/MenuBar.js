import { ListItemText, List, ListItem, ListItemIcon } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import { lists } from "./../data/data";
import { ImportContacts } from "@material-ui/icons";
import { Functions, SortByAlpha, Dvr } from "@material-ui/icons";

const MenuBar = ({ close }) => {
  const classes = useStyles();
  const { listId } = useParams();
  const history = useHistory();

  const handleClick = (index) => () => {
    history.push(`/${index}`);
    close();
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {lists.map((list, index) => (
          <ListItem
            button
            key={list}
            selected={listId === index}
            onClick={handleClick(index)}
          >
            <ListItemIcon>
              {list === "Math" ? <Functions /> : ""}
              {list === "Hebraw" ? <ImportContacts /> : ""}
              {list === "English" ? <SortByAlpha /> : ""}
              {list === "Computer" ? <Dvr /> : ""}
            </ListItemIcon>
            <ListItemText primary={list} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export default MenuBar;
