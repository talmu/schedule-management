import { CardActions, CardContent, FormControlLabel } from "@material-ui/core";
import { Grid, TextField, IconButton, Card, MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { AddCircle } from "@material-ui/icons";
import FieldFilterOptions from "../features/Filters/FieldFilterOptions";

const fields = ["Status", "Priority", "Scheduled", "Due"];

const AddFilterPage = () => {
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);
  const [options, setOptions] = useState(fields);

  const handleOptions = (newOptions) => setOptions(newOptions);
  const handleClick = () => setClicked(!clicked);

  return (
    <div>
      <Grid container className={classes.grid}>
        <Grid item>
          <TextField label="Filter Name" />
        </Grid>
        <Grid item className={classes.marginTop}>
          <Button size="small" color="secondary" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>

      <Card className={classes.margin}>
        <CardContent>
          <TextField id="select" value="And" select variant="outlined">
            {["And", "Or"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </CardContent>
        <CardActions>
          <Grid
            container
            spacing={2}
            direction="column"
            className={classes.marginLeft1}
          >
            {options.length !== 0 ? (
              <Grid item>
                <FormControlLabel
                  control={
                    <IconButton
                      color="secondary"
                      size="small"
                      onClick={handleClick}
                    >
                      <AddCircle />
                    </IconButton>
                  }
                  label="Add Filter Field"
                />
              </Grid>
            ) : null}
            <FieldFilterOptions
              options={options}
              setOptions={handleOptions}
              clicked={clicked}
            />
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  marginLeft1: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  marginLeft2: {
    marginLeft: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  margin: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  grid: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
}));

export default AddFilterPage;
