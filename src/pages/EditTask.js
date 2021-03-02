import Task from "./../features/Task/Task";
import Loading from "../components/Loading";
import { useTask, useSubtasks } from "../data/DBHooks";

const EditTask = () => {
  const [task, isTaskFetching] = useTask();
  const [subtasks, isSubtaskFetching] = useSubtasks();

  const isFetching = isTaskFetching || isSubtaskFetching;

  return isFetching ? <Loading /> : <Task task={task} subtasks={subtasks} />;
};

export default EditTask;
