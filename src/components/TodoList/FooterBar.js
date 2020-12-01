import { Grid, Button } from "@material-ui/core";

function DialogFooterBar(props) {
  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item xs={3}>
        <Button
          name="cancel"
          variant="contained"
          color="primary"
          onClick={props.handleClose}
        >
          Cancle
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          name="submit"
          onClick={props.handleSubmit(props.onSubmit)}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
}

export default DialogFooterBar;
