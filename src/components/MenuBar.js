import { ListItemText, List, ListItem, ListItemIcon } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import { useRxData } from "rxdb-hooks";
import { ImportContacts } from "@material-ui/icons";
import { Functions, SortByAlpha, Dvr } from "@material-ui/icons";
import Loading from "../components/Loading";

const MenuBar = ({ close }) => {
  const classes = useStyles();
  const { listId } = useParams();
  const history = useHistory();

  const { result: lists } = useRxData("lists", (collection) =>
    collection.find()
  );

  const handleClick = (list_id) => () => {
    history.push(`/${list_id}`);
    close();
  };

  return lists ? (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {lists.map((list) => (
          <ListItem
            button
            key={list.id}
            selected={list.id === listId}
            onClick={handleClick(list.id)}
          >
            <ListItemIcon>
              {list.id === "1" ? <Functions /> : ""}
              {list.id === "2" ? <ImportContacts /> : ""}
              {list.id === "3" ? <SortByAlpha /> : ""}
              {list.id === "4" ? <Dvr /> : ""}
            </ListItemIcon>
            <ListItemText primary={list.name} />
          </ListItem>
        ))}
      </List>
    </div>
  ) : (
    <Loading />
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export default MenuBar;
