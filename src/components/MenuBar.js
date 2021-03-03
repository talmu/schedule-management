import { ListItemText, List, ListItem, ListItemIcon } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import { ImportContacts } from "@material-ui/icons";
import { Functions, SortByAlpha, Dvr } from "@material-ui/icons";
import Loading from "../components/Loading";
import { useLists } from "../data/DBHooks";
import AddNewList from "./AddNewList";
import * as R from "ramda";

const MenuBar = ({ close }) => {
  const classes = useStyles();
  const { listId } = useParams();
  const history = useHistory();

  const [lists, isFetching] = useLists();

  const handleClick = (list_id) => () => {
    history.push(`/${list_id}`);
    close();
  };

  return isFetching ? (
    <Loading />
  ) : (
    <div>
      <div className={classes.toolbar}>
        <AddNewList />
      </div>
      <Divider />
      <List>
        {lists.map((list, index) => (
          <ListItem
            button
            key={list.id}
            selected={list.id === listId}
            onClick={handleClick(list.id)}
          >
            <ListItemIcon>
              {R.equals(list.name, "Math") ? <Functions /> : ""}
              {R.equals(list.name, "Hebrew") ? <ImportContacts /> : ""}
              {R.equals(list.name, "English") ? <SortByAlpha /> : ""}
              {R.equals(list.name, "Computer") ? <Dvr /> : ""}
            </ListItemIcon>
            <ListItemText primary={list.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  iconButton: {
    padding: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

export default MenuBar;
