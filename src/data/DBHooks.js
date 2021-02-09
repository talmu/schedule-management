import { useRxData } from "rxdb-hooks";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

export const useTodoList = () => {
  const { listId } = useParams();

  const queryConstructor = useCallback(
    (collection) => collection.find().where("list_id").equals(listId),
    [listId]
  );

  const { result: todoList, isFetching } = useRxData("todos", queryConstructor);

  return [todoList, isFetching];
};
