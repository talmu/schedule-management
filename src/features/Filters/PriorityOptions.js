import { FormControl, FormGroup, Checkbox } from "@material-ui/core";
import { FormControlLabel, FormHelperText } from "@material-ui/core";
import Loading from "../../components/Loading";
import { usePriorities } from "../../data/DBHooks";

const PriorityOptions = ({ value, setValue, error }) => {
  const [priority, isFetching] = usePriorities();

  const handleChange = (event) => {
    const name = event.target.name;
    if (event.target.checked) {
      setValue([...value, name]);
    } else {
      const array = [...value];
      array.splice(value.indexOf(name), 1);
      setValue(array);
    }
  };

  return isFetching ? (
    <Loading />
  ) : (
    <div style={{ display: "flex" }}>
      <FormControl
        component="fieldset"
        error={error}
        required
        style={{ margin: 3 }}
      >
        <FormGroup>
          {priority.map((p) => (
            <FormControlLabel
              key={p.id}
              control={
                <Checkbox
                  checked={value.indexOf(p.text) !== -1}
                  onChange={handleChange}
                  name={p.text}
                />
              }
              label={p.text}
            />
          ))}
        </FormGroup>
        {error ? <FormHelperText>You must pick at least 1</FormHelperText> : ""}
      </FormControl>
    </div>
  );
};

export default PriorityOptions;
