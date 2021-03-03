import Task from "./../features/Task/Task";
import Loading from "../components/Loading";
import { useTask, useSubtasks } from "../data/DBHooks";
import * as R from "ramda";

const EditTask = () => {
  const [task, isTaskFetching] = useTask();
  const [subtasks, isSubtaskFetching] = useSubtasks();

  const isFetching = R.isNil(task) || isSubtaskFetching;

  return isFetching ? <Loading /> : <Task task={task} subtasks={subtasks} />;
};

export default EditTask;
