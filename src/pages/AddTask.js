import { useRxCollection } from "rxdb-hooks";
import Task from "./../features/Task/Task";
import { formatISO } from "date-fns";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const AddTask = () => {
  const { listId } = useParams();
  const todos = useRxCollection("todos");
  console.log(todos);

  let tempTask;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDateTime = formatISO(tomorrow).slice(0, -9);

  todos
    ? (tempTask = todos.newDocument({
        name: "",
        status_id: "1",
        priority_id: "4",
        list_id: listId,
        notes: "",
        reminder: "00:00",
        duration: "02:00",
        scheduled: formatISO(today, { representation: "date" }),
        due: formattedDateTime,
      }))
    : (tempTask = {});

  return todos ? (
    <Task key="new-item" task={tempTask} subtasks={[]} />
  ) : (
    <Loading />
  );
};

export default AddTask;
