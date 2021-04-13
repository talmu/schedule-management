import { ListItemText, List, ListItem, ListItemIcon } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import Loading from "../components/Loading";
import { useLists } from "../data/DBHooks";
import AddNewList from "./AddNewList";

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
        {lists.map((list) => (
          <ListItem
            button
            key={list.id}
            selected={list.id === listId}
            onClick={handleClick(list.id)}
          >
            <ListItemIcon>
              <ListIcon />
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
