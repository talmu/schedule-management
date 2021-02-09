import { useParams } from "react-router-dom";
import Task from "./../features/Task/Task";
import { useRxDocument, useRxData } from "rxdb-hooks";
import FetchingData from "../data/FetchingData";
import Loading from "../components/Loading";

const EditTask = () => {
  const { taskId } = useParams();

  const task = useRxDocument("todos", taskId);
  const subtasks = useRxData("subtasks", (collection) =>
    collection.find().where("task_id").equals(taskId)
  );

  return !task.isFetching && !subtasks.isFetching ? (
    <Task task={task.result} subtasks={subtasks.result} />
  ) : (
    <Loading />
  );

  // const hooks = [
  //   useRxDocument("todos", taskId),
  //   useRxData("subtasks", (collection) =>
  //     collection.find().where("task_id").equals(taskId)
  //   ),
  // ];

  // return (
  //   <FetchingData hooks={hooks}>
  //     <Task task={hooks[0].result} subtasks={hooks[1].result} />
  //   </FetchingData>
  // );
};

export default EditTask;
