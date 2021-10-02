import { Grid } from "@material-ui/core";
import StatusOptions from "./StatusOptions";
import PriorityOptions from "./PriorityOptions";
import ScheduledOption from "./ScheduledOption";
import DueOption from "./DueOption";

const SelectedField = ({ value, setValue, error, field }) => {
  return (
    <div>
      <Grid item xs={12}>
        {field === "Status" ? (
          <StatusOptions value={value} setValue={setValue} error={error} />
        ) : null}
        {field === "Priority" ? (
          <PriorityOptions value={value} setValue={setValue} error={error} />
        ) : null}
        {field === "Scheduled" ? (
          <ScheduledOption value={value} setValue={setValue} />
        ) : null}
        {field === "Due" ? (
          <DueOption value={value} setValue={setValue} />
        ) : null}
      </Grid>
    </div>
  );
};

export default SelectedField;
