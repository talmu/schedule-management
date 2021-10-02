import { TextField } from "@material-ui/core";

const ScheduledOption = ({ value, setValue }) => {
  return (
    <TextField
      id="task-schedule"
      name="scheduled"
      type="date"
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
    ></TextField>
  );
};

export default ScheduledOption;
