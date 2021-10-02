import { Grid, MenuItem, TextField } from "@material-ui/core";

const FieldSelect = ({ field, setField, options }) => {
  const handleFieldChange = (e) => {
    const newField = e.target.value;
    setField(newField);
  };

  return (
    <Grid item xs={4}>
      <TextField
        id="field-select"
        value={field}
        select
        onChange={handleFieldChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
};

export default FieldSelect;
