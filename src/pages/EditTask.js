import { useParams } from "react-router-dom";
import Task from "./../features/Task/Task";
import { useSelector } from "react-redux";

const EditTask = () => {
  const { listId, taskId } = useParams();
  const task = useSelector((state) => state.todos[listId].data[taskId]);
  return <Task key={`${listId}-${task}`} task={task} />;
};

export default EditTask;
