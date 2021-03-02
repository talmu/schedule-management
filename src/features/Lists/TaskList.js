import React from "react";
import { List } from "@material-ui/core";
import Item from "./Item";
import { useTodoList } from "../../data/DBHooks";
import Loading from "../../components/Loading";
import { makeStyles } from "@material-ui/core/styles";

const TaskList = () => {
  const [todoList, isFetching] = useTodoList();
  const classes = useStyles();

  return isFetching ? (
    <Loading />
  ) : (
    <div style={{ width: "95%" }}>
      <List key="todolist" className={classes.list}>
        {todoList.map((todo) => {
          return <Item key={todo.id} todo={todo} />;
        })}
      </List>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default TaskList;
