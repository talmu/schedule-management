import { useRxCollection } from "rxdb-hooks";
import Task from "./../features/Task/Task";
import { formatISO } from "date-fns";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const AddTask = () => {
  const { listId } = useParams();
  const todos = useRxCollection("todos");

  let tempDoc = {};
  const subtasks = [];
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (todos) {
    tempDoc = todos.newDocument({
      name: "",
      status_id: "1",
      priority_id: "4",
      list_id: listId,
      notes: "",
      reminder: "00:00",
      duration: "02:00",
      scheduled: formatISO(today, { representation: "date" }),
      due: formatISO(tomorrow),
    });
    console.log(tempDoc.due);
  }

  return todos ? (
    <Task key="new-item" task={tempDoc} subtasks={subtasks} />
  ) : (
    <Loading />
  );
};

export default AddTask;
