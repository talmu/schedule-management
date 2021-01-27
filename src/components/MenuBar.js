import { ListItemText, List, ListItem, ListItemIcon } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
// import { lists } from "./../data/data";
import { useRxCollection, useRxData } from "rxdb-hooks";
import { ImportContacts } from "@material-ui/icons";
import { Functions, SortByAlpha, Dvr } from "@material-ui/icons";
import { useCallback } from "react";

const MenuBar = ({ close }) => {
  const classes = useStyles();
  const { listId } = useParams();
  const history = useHistory();

  // const lists = useRxCollection("lists");

  const queryConstructor = useCallback(
    (collection) => collection.find().where("id").equals(listId),
    [listId]
  );

  const { result: lists, isFetching } = useRxData("lists", queryConstructor);
  // console.log(db.todos);
  // db.lists
  //   .find()
  //   .exec()
  //   .then((documents) => setLists(documents || []));

  const handleClick = (list_id) => () => {
    history.push(`/${list_id}`);
    close();
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {lists.map((list) => (
          <ListItem
            button
            key={list}
            selected={listId === list.id}
            onClick={handleClick(list.id)}
          >
            <ListItemIcon>
              {list.id === 1 ? <Functions /> : ""}
              {list.id === 2 ? <ImportContacts /> : ""}
              {list.id === 3 ? <SortByAlpha /> : ""}
              {list.id === 4 ? <Dvr /> : ""}
            </ListItemIcon>
            <ListItemText primary={list.name} />
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
