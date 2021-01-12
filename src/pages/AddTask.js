import { formatISO } from "date-fns";
import { status, priority } from "../data/data";
import Task from "./../features/Task/Task";

const AddTask = () => {
  const today = new Date();
  const formattedDate = formatISO(today, { representation: "date" });

  const task = {
    name: "",
    status: status[0],
    priority: priority[3],
    notes: "",
    scheduled: formattedDate,
    duration: "02:00",
    reminder: "00:00",
    tags: [],
    subtasks: [],
  };
  return <Task key="new-item" task={task} />;
};

export default AddTask;
