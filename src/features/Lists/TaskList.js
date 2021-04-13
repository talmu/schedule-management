import React from "react";
import { List } from "@material-ui/core";
import Item from "./Item";
import { useTodoList } from "../../data/DBHooks";
import Loading from "../../components/Loading";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

const TaskList = ({ list_id }) => {
  const { listId } = useParams();
  const id = list_id ? list_id : listId;
  const [todoList, isTodoFetching] = useTodoList(id);
  const classes = useStyles();

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
        <div className={classes.container}>
          <div className={classes.item}>+ Start Add Your Todos</div>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    width: "100vw",
  },
  item: {
    color: "lightgrey",
    fontSize: 25,
  },
}));

export default TaskList;
