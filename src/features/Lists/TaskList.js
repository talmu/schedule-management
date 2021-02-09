import React from "react";
import { List } from "@material-ui/core";
import Item from "./Item";
import { useTodoList } from "../../data/DBHooks";
import Loading from "../../components/Loading";

const TaskList = () => {
  const [todoList, isFetching] = useTodoList();

  const content = isFetching ? (
    <Loading />
  ) : (
    <div style={{ width: "95%" }}>
      <List key="todolist">
        {todoList.map((todo) => {
          return <Item key={todo.id} todo={todo} />;
        })}
      </List>
    </div>
  );

  return content;
};

export default TaskList;
