import { RadioGroup, FormControl, FormControlLabel } from "@material-ui/core";
import { Radio, FormLabel } from "@material-ui/core";
import { priority } from "../../data/data";

function Priority(props) {
  return (
    <FormControl
      name="priority"
      component="fieldset"
      className="col-12"
      ref={props.register}
    >
      <FormLabel name="priority-label" component="legend" className="ml-1">
        Priority
      </FormLabel>
      <RadioGroup row value={priority[3]}>
        {priority.map((p, index) => (
          <FormControlLabel
            key={index}
            name={p}
            value={p}
            control={<Radio color="secondary" />}
            label={p}
            labelPlacement="bottom"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default Priority;
