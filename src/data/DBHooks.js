import { useRxData, useRxDocument } from "rxdb-hooks";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

export const useTodoList = (id) => {
  const queryConstructor = useCallback(
    (collection) => collection.find().where("list_id").equals(id),
    [id]
  );

  const { result: todoList, isFetching } = useRxData("todos", queryConstructor);

  return [todoList, isFetching];
};

export const useTask = () => {
  const { taskId } = useParams();
  const { result: task, isFetching } = useRxDocument("todos", taskId);

  return [task, isFetching];
};

export const useSubtasks = (id) => {
  const { taskId } = useParams();

  const task_id = id ? id : taskId;

  const queryConstructor = useCallback(
    (collection) => collection.find().where("task_id").equals(task_id),
    [task_id]
  );

  const { result: subtasks, isFetching } = useRxData(
    "subtasks",
    queryConstructor
  );

  return [subtasks, isFetching];
};

export const useTaskTags = (id) => {
  const queryConstructor = useCallback(
    (collection) => collection.find().where("task_id").equals(id),
    [id]
  );

  const { result: task_tags, isFetching } = useRxData(
    "task_tags",
    queryConstructor
  );

  return [task_tags, isFetching];
};

export const useStatus = () => {
  const { result: status, isFetching } = useRxData("status", (collection) =>
    collection.find()
  );

  return [status, isFetching];
};

export const usePriorities = () => {
  const { result: priority, isFetching } = useRxData("priority", (collection) =>
    collection.find()
  );

  return [priority, isFetching];
};

export const useTags = () => {
  const { result: tags, isFetching } = useRxData("tags", (collection) =>
    collection.find()
  );

  return [tags, isFetching];
};

export const useTasksTag = (tag_id) => {
  const queryConstructor = useCallback(
    (collection) => collection.find().where("tag_id").equals(tag_id),
    [tag_id]
  );

  const { result: tasks_tag, isFetching } = useRxData(
    "task_tags",
    queryConstructor
  );

  return [tasks_tag, isFetching];
};

export const useLists = () => {
  const { result: lists, isFetching } = useRxData("lists", (collection) =>
    collection.find()
  );

  return [lists, isFetching];
};

export const useList = (listId) => {
  const { result: list } = useRxDocument("lists", listId);

  return list;
};

export const useTag = (tagId) => {
  const { result: tag } = useRxDocument("tags", tagId);

  return tag;
};
