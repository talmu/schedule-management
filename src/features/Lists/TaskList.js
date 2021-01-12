import React from "react";
import { List } from "@material-ui/core";
import { useSelector } from "react-redux";
import Item from "./Item";
import { useParams } from "react-router-dom";

const TaskList = () => {
  const { listId } = useParams();
  const todoList = useSelector((state) => state.todos[listId]);

  return (
    <div style={{ width: "95%" }}>
      <List key="todolist">
        {todoList.data.map((task, index) => {
          return (
            <Item key={index.toString()} index={index} todoList={todoList} />
          );
        })}
      </List>
    </div>
  );
};

export default TaskList;
