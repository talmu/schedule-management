import { useRxCollection } from "rxdb-hooks";
import Task from "./../features/Task/Task";
import { formatISO } from "date-fns";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const AddTask = () => {
  const { listId } = useParams();
  const todos = useRxCollection("todos");

  const subtasks = [];
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tempDoc = todos?.newDocument({
    name: "",
    status_id: "04c8e4ed-2d1d-4bcf-bc27-10bf650d31d0",
    priority_id: "1e873faf-6559-407b-ab41-e328ab75f89b",
    list_id: listId,
    notes: "",
    reminder: "00:00",
    duration: "02:00",
    scheduled: formatISO(today, { representation: "date" }),
    due: formatISO(tomorrow),
  });

  return todos ? (
    <Task key="new-item" task={tempDoc} subtasks={subtasks} />
  ) : (
    <Loading />
  );
};

export default AddTask;
