import { Grid, Button, CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/store";
import { v4 as uuidv4 } from "uuid";

const FooterBar = (props) => {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (data.tags) {
      const newTags = data.tags.filter((tag) => props.tags.indexOf(tag) === -1);
      if (newTags.length > 0) {
        dispatch(actions.addTags(newTags));
      }
    }
    console.log(props.tags);

    if (props.selectedTask === -1) {
      const newTask = { id: uuidv4(), ...data };
      dispatch(actions.addTask(newTask));
    } else {
      const task = { id: props.task.id, ...data };

      dispatch(actions.editTask(task));
    }

    console.log(props.todos[props.selectedIndex]);
    console.log(props.tags);

    props.setOpen(false);
  };

  return (
    <Grid container direction="row" justify="flex-end">
      <Grid item xs={3}>
        <Button
          name="cancel"
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            props.setOpen(false);
          }}
        >
          Cancle
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          name="submit"
          onClick={props.handleSubmit(onSubmit)}
          variant="contained"
          size="small"
          color="primary"
          disabled={props.formState.isSubmitting}
        >
          {props.formState.isSubmitting && <CircularProgress />}
          {props.mode}
        </Button>
      </Grid>
    </Grid>
  );
};

export default FooterBar;
