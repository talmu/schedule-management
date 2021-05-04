import React from "react";
import { List, Typography } from "@material-ui/core";
import Item from "./Item";
import { useTodoList } from "../../data/DBHooks";
import Loading from "../../components/Loading";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import * as R from "ramda";

const TaskList = ({ list_id }) => {
  const { listId } = useParams();
  const id = list_id ? list_id : listId;
  const [todoList, isTodoFetching] = useTodoList(id);
  const classes = useStyles();
  const history = useHistory();

  const pathname = history.location.pathname;

  const isMainPage = R.equals(pathname, "/");

  return isTodoFetching ? (
    <Loading />
  ) : (
    <div style={{ width: "95%" }}>
      {todoList.length > 0 ? (
        <List key={id} className={classes.list}>
          {todoList.map((todo) => {
            return <Item key={todo.id} todo={todo} />;
          })}
        </List>
      ) : (
        <Typography
          className={isMainPage ? classes.emptyList : classes.emptyPage}
        >
          {isMainPage ? "Empty List" : "+ Start Add Your Todos"}
        </Typography>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    marginLeft: theme.spacing(1),
    // marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  emptyPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    width: "100vw",
    fontSize: theme.typography.pxToRem(25),
    color: "lightgrey",
  },
  emptyList: {
    fontSize: theme.typography.pxToRem(15),
    color: "lightgrey",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "5px",
  },
}));

export default TaskList;
