import { IconButton, Toolbar } from "@material-ui/core";
import { AppBar, Grid } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const BasicToolbar = ({ handleOk, redirect }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <IconButton name="submit" color="inherit" onClick={handleOk}>
            <Check />
          </IconButton>
          <IconButton name="cancle" color="inherit" onClick={redirect}>
            <Close />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

export default BasicToolbar;
