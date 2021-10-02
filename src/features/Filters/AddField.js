import { Button, Grid } from "@material-ui/core";
import { operators } from "./FieldFilterOptions";

const AddField = ({
  field,
  setField,
  filters,
  setFilters,
  value,
  operator,
  options,
  setOptions,
  error,
}) => {
  const handleAddField = () => {
    if (field === "Status" || field === "Priority") {
      if (value.length === 0) return;
    }

    const newFilters = [
      ...filters,
      {
        option: field,
        operator: operators[field][operator],
        value: value,
      },
    ];

    setFilters(newFilters);
    let newOptions = [...options];
    newOptions = newOptions.filter((option) => option !== field);
    if (newOptions.length !== 0) setField(newOptions[0]);
    setOptions(newOptions);
  };

  return (
    <Grid item xs={12}>
      <Button variant="contained" onClick={handleAddField} disabled={error}>
        Done
      </Button>
    </Grid>
  );
};

export default AddField;
