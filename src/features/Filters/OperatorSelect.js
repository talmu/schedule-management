import { Grid, MenuItem, TextField } from "@material-ui/core";
import { operators } from "./FieldFilterOptions";

const OperatorSelect = ({ operator, setOperator, field }) => {
  return (
    <Grid item xs={6}>
      <TextField
        id="operator-select"
        value={operator}
        select
        onChange={(e) => setOperator(e.target.value)}
      >
        {operators[field]?.map((operator, index) => (
          <MenuItem key={operator} value={index}>
            {operator}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
};

export default OperatorSelect;
