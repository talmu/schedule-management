import { status, priority } from "../../data/data";
import formatISO from "date-fns/formatISO";
import ItemDialog from "./ItemDialog";

const today = new Date();
const formattedDate = formatISO(today, { representation: "date" });

const AddDefaultValues = (props) => {
  const task = {
    name: "",
    status: status[0],
    priority: priority[3],
    notes: "",
    scheduled: formattedDate,
    duration: "02:00",
    reminder: "00:00",
    tags: [],
  };

  return (
    <ItemDialog
      open={props.open}
      setOpen={props.setOpen}
      task={task}
    ></ItemDialog>
  );
};

export default AddDefaultValues;
