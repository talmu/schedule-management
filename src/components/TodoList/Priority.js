import { RadioGroup, FormControl, FormControlLabel } from "@material-ui/core";
import { Radio, FormLabel, Grid } from "@material-ui/core";
import { priority } from "../../data/data";
function Priority(props) {
  return (
    <FormControl name="priority" component="fieldset" ref={props.register}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormLabel name="priority-label" component="legend">
            Priority
          </FormLabel>
        </Grid>
        <RadioGroup row value={priority[3]}>
          {priority.map((p, index) => (
            <Grid item xs={3}>
              <FormControlLabel
                key={index}
                name={p}
                value={p}
                control={<Radio color="secondary" />}
                label={p}
                labelPlacement="bottom"
              />
            </Grid>
          ))}
        </RadioGroup>
      </Grid>
    </FormControl>
  );
}

export default Priority;
