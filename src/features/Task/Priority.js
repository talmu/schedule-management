import { Controller } from "react-hook-form";
import { RadioGroup, FormControl, FormControlLabel } from "@material-ui/core";
import { Radio, FormLabel, Grid } from "@material-ui/core";
import { useRxData } from "rxdb-hooks";

const Priority = ({ control, taskPriority }) => {
  const { result: priority } = useRxData("priority", (collection) =>
    collection.find()
  );

  return (
    <FormControl component="fieldset">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormLabel component="legend">Priority</FormLabel>
        </Grid>
        <Controller
          name="priority_id"
          control={control}
          rules={{ required: true }}
          defaultValue={taskPriority}
          render={({ onChange, value }) => (
            <RadioGroup
              row
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {priority.map((p) => {
                return (
                  <Grid item xs={3} key={p.id}>
                    <FormControlLabel
                      name={p.id}
                      value={p.id}
                      control={<Radio color="secondary" />}
                      label={p.text}
                      labelPlacement="bottom"
                    />
                  </Grid>
                );
              })}
            </RadioGroup>
          )}
        />
      </Grid>
    </FormControl>
  );
};

export default Priority;
