import { useParams } from "react-router-dom";
import { useRxDB } from "rxdb-hooks";
import DeletePage from "./DeletePage";
import { useList } from "../data/DBHooks";

const DeleteListPage = () => {
  const { listId } = useParams();
  console.log(listId);
  const db = useRxDB();
  const listObj = useList(listId);

  const handleDelete = async () => {
    const query = db.todos.find().where("list_id").equals(listId);
    const todos = await query.exec();
    todos.map((todo) => deleteTodo(todo));
    await listObj.remove();
  };

  const deleteTodo = async (todo) => {
    deleteTags(todo);
    deleteSubtasks(todo);
    todo.remove();
  };

  const deleteTags = async (todo) => {
    const query = db.task_tags.find().where("task_id").equals(todo.id);
    const task_tags = await query.exec();
    await Promise.all(task_tags.map((task_tag) => task_tag.remove()));
  };

  const deleteSubtasks = async (todo) => {
    const query = db.subtasks.find().where("task_id").equals(todo.id);
    const subtasks = await query.exec();
    await Promise.all(subtasks.map((subtask) => subtask.remove()));
  };

  return <DeletePage handleDelete={handleDelete} />;
};

export default DeleteListPage;
