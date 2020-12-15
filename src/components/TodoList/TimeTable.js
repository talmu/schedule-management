import { TextField, Grid } from "@material-ui/core";

const TimeTable = (props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <TextField
          id="task-schedule"
          name="scheduled"
          label="Scheduled"
          type="date"
          className="mr-4"
          defaultValue={props.task.scheduled}
          InputLabelProps={{ shrink: true }}
          inputRef={props.register({ required: true })}
        ></TextField>
      </Grid>

      <Grid item xs={4}>
        <TextField
          id="task-duration"
          name="duration"
          label="Duration"
          type="time"
          defaultValue={props.task.duration}
          InputLabelProps={{ shrink: true }}
          inputRef={props.register({ required: true })}
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="task-due"
          name="due"
          label="Due"
          type="datetime-local"
          defaultValue={props.task.due}
          InputLabelProps={{ shrink: true }}
          inputRef={props.register({ required: true })}
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="task-reminder"
          name="reminder"
          label="Reminder"
          type="time"
          defaultValue={props.task.reminder}
          InputLabelProps={{ shrink: true }}
          inputRef={props.register({ required: true })}
        ></TextField>
      </Grid>
    </Grid>
  );
};

export default TimeTable;
