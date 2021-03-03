import React from "react";
import { List } from "@material-ui/core";
import Item from "./Item";
import { useTodoList } from "../../data/DBHooks";
import Loading from "../../components/Loading";
import { makeStyles } from "@material-ui/core/styles";
import { useStatus } from "../../data/DBHooks";

const TaskList = () => {
  const [todoList, isTodoFetching] = useTodoList();
  const [status, isStatusFetching] = useStatus();
  const classes = useStyles();

  return isTodoFetching || isStatusFetching ? (
    <Loading />
  ) : (
    <div style={{ width: "95%" }}>
      {todoList.length > 0 ? (
        <List key="todolist" className={classes.list}>
          {todoList.map((todo) => {
            return <Item key={todo.id} todo={todo} status={status} />;
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
