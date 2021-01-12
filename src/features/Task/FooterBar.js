import { useDispatch } from "react-redux";
import { actions } from "../../redux/store";
import { v4 as uuidv4 } from "uuid";
import { Delete, Close, Save } from "@material-ui/icons";
import { AppBar, Toolbar, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";

const FooterBar = ({ handleSubmit, tags, task, todos, mode }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { listId, taskId } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    dispatch(actions.deleteTask({ listId: listId, taskId: taskId }));
  };

  const redirectToList = () => {
    history.push(`/${listId}`);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (data.tags) {
      const newTags = data.tags.filter((tag) => tags.indexOf(tag) === -1);
      if (newTags.length > 0) {
        dispatch(actions.addTags(newTags));
      }
    }
    console.log(tags);

    if (taskId) {
      const newTask = { id: task.id, ...data };
      dispatch(actions.editTask({ task: newTask, listId: listId }));
    } else {
      const newTask = { id: uuidv4(), ...data };
      dispatch(
        actions.addTask({ task: newTask, listId: listId, taskId: taskId })
      );
    }

    console.log(todos[listId]);
    console.log(tags);
  };

  const deleteIcon = (
    <IconButton color="inherit" onClick={handleDelete}>
      <Delete />
    </IconButton>
  );

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          {taskId ? deleteIcon : null}
          <IconButton
            name="submit"
            color="inherit"
            onClick={() => {
              handleSubmit(onSubmit);
              redirectToList();
            }}
          >
            <Save />
          </IconButton>
          <IconButton color="inherit" onClick={redirectToList}>
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

export default FooterBar;
