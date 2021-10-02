import { TextField } from "@material-ui/core";

const DueOption = ({ value, setValue }) => {
  return (
    <TextField
      id="task-due"
      name="due"
      type="datetime-local"
      value={value}
      size="small"
      onChange={(e, newValue) => setValue(newValue)}
    ></TextField>
  );
};

export default DueOption;
