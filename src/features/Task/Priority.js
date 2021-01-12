import { Controller } from "react-hook-form";
import { RadioGroup, FormControl, FormControlLabel } from "@material-ui/core";
import { Radio, FormLabel, Grid } from "@material-ui/core";
import { priority } from "../../data/data";

const Priority = ({ control, taskPriority }) => {
  return (
    <FormControl component="fieldset">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormLabel component="legend">Priority</FormLabel>
        </Grid>
        <Controller
          name="priority"
          control={control}
          rules={{ required: true }}
          defaultValue={taskPriority}
          render={({ onChange, value }) => (
            <RadioGroup
              row
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {priority.map((p, index) => {
                const key = `${index}-${p}`;
                return (
                  <Grid item xs={3} key={key}>
                    <FormControlLabel
                      name={p}
                      value={p}
                      control={<Radio color="secondary" />}
                      label={p}
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

// <Controller
// name="priority"
// control={control}
// rules={{ required: true }}
// defaultValue={taskPriority}
// render={({ onChange, value }) => (
//   <FormControl component="fieldset">
//     <Grid container spacing={1}>
//       <Grid item xs={12}>
//         <FormLabel component="legend">Priority</FormLabel>
//       </Grid>
//       <RadioGroup
//         row
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       >
//         {priority.map((p, index) => {
//           const key = `${index}-${p}`;
//           return (
//             <Grid item xs={3} key={key}>
//               <FormControlLabel
//                 name={p}
//                 value={p}
//                 control={<Radio color="secondary" />}
//                 label={p}
//                 labelPlacement="bottom"
//               />
//             </Grid>
//           );
//         })}
//       </RadioGroup>
//     </Grid>
//   </FormControl>
// )}
// />
