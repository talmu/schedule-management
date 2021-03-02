import { TextField, Grid } from "@material-ui/core";

const TimeTable = ({ task, register }) => {
  const due = task.due.slice(0, 16);

  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <TextField
          id="task-schedule"
          name="scheduled"
          label="Scheduled"
          type="date"
          className="mr-4"
          defaultValue={task.scheduled}
          InputLabelProps={{ shrink: true }}
          inputRef={register({ required: true })}
        ></TextField>
      </Grid>

      <Grid item xs={4}>
        <TextField
          id="task-duration"
          name="duration"
          label="Duration"
          type="time"
          defaultValue={task.duration}
          InputLabelProps={{ shrink: true }}
          inputRef={register({ required: true })}
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="task-due"
          name="due"
          label="Due"
          type="datetime-local"
          defaultValue={due}
          InputLabelProps={{ shrink: true }}
          inputRef={register({ required: true })}
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="task-reminder"
          name="reminder"
          label="Reminder"
          type="time"
          defaultValue={task.reminder}
          InputLabelProps={{ shrink: true }}
          inputRef={register({ required: true })}
        ></TextField>
      </Grid>
    </Grid>
  );
};

export default TimeTable;
