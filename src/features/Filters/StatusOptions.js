import { FormControl, FormGroup, Checkbox } from "@material-ui/core";
import { FormControlLabel, FormHelperText } from "@material-ui/core";
import Loading from "../../components/Loading";
import { useStatus } from "../../data/DBHooks";

const StatusOptions = ({ value, setValue, error }) => {
  const [status, isFetching] = useStatus();

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
          {status.map((s) => (
            <FormControlLabel
              key={s.id}
              control={
                <Checkbox
                  checked={value.indexOf(s.text) !== -1}
                  onChange={handleChange}
                  name={s.text}
                />
              }
              label={s.text}
            />
          ))}
        </FormGroup>
        {error ? <FormHelperText>You must pick at least 1</FormHelperText> : ""}
      </FormControl>
    </div>
  );
};

export default StatusOptions;
