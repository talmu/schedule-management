import { TextField, Grid } from "@material-ui/core";

function TimeTable(props) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <TextField
          id="task-schedule"
          name="scheduled"
          label="Scheduled"
          type="date"
          className="mr-4"
          InputLabelProps={{ shrink: true }}
          inputRef={props.register}
        ></TextField>
      </Grid>

      <Grid item xs={4}>
        <TextField
          id="task-duration"
          name="duration"
          label="Duration"
          type="time"
          InputLabelProps={{ shrink: true }}
          inputRef={props.register}
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="task-due"
          name="due"
          label="Due"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          inputRef={props.register}
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="task-reminder"
          name="reminder"
          label="Reminder"
          type="time"
          InputLabelProps={{ shrink: true }}
          inputRef={props.register}
        ></TextField>
      </Grid>
    </Grid>
  );
}

export default TimeTable;
