import { TextField } from "@material-ui/core";

function TimeTable(props) {
  return (
    <div>
      <TextField
        id="task-schedule"
        name="scheduled"
        label="Scheduled"
        type="date"
        className="mr-4"
        InputLabelProps={{ shrink: true }}
        inputRef={props.register}
      ></TextField>
      <TextField
        id="task-duration"
        name="duration"
        label="Duration"
        type="time"
        InputLabelProps={{ shrink: true }}
        inputRef={props.register}
      ></TextField>
      <TextField
        id="task-due"
        name="due"
        label="Due"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        inputRef={props.register}
      ></TextField>
      <TextField
        id="task-reminder"
        name="reminder"
        label="Reminder"
        type="time"
        InputLabelProps={{ shrink: true }}
        inputRef={props.register}
      ></TextField>
    </div>
  );
}

export default TimeTable;
