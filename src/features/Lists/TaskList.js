import React from "react";
import { List } from "@material-ui/core";
import Item from "./Item";
import { useTodoList } from "../../data/useTodoList";
import Loading from "../../components/Loading";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

const TaskList = () => {
  // const { listId } = useParams();
  // const todoList = useSelector((state) => state.todos[listId]);
  const [todoList, isFetching] = useTodoList();

  console.log(todoList, isFetching);

  const content = isFetching ? (
    <Loading />
  ) : (
    <div style={{ width: "95%" }}>
      <List key="todolist">
        {todoList.map((task) => {
          console.log(task);
          // return "";
          return <Item key={task.id} todo={task} />;
        })}
      </List>
    </div>
  );

  return content;
};

export default TaskList;
