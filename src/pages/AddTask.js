import { formatISO } from "date-fns";
import Task from "./../features/Task/Task";

const AddTask = () => {
  const today = new Date();
  const formattedDate = formatISO(today, { representation: "date" });

  const task = {
    name: "",
    status: "1",
    priority: "4",
    notes: "",
    scheduled: formattedDate,
    duration: "02:00",
    reminder: "00:00",
    subtasks: [],
    tags: [],
  };
  return <Task key="new-item" task={task} />;
};

export default AddTask;
