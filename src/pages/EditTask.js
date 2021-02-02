import { useParams } from "react-router-dom";
import Task from "./../features/Task/Task";
import { useRxDocument, useRxData } from "rxdb-hooks";

const EditTask = () => {
  const { taskId } = useParams();
  const { result: task } = useRxDocument("todos", taskId);
  const { result: task_tags } = useRxData("task_tags", (collection) =>
    collection.find().where("task_id").equals(taskId)
  );
  const { result: subtasks } = useRxData("subtasks", (collection) =>
    collection.find().where("task_id").equals(taskId)
  );

  const taskData = {
    ...task,
    subtasks: subtasks,
    tags: task_tags,
  };

  console.log(taskData);

  return <Task task={taskData} />;
};

export default EditTask;
