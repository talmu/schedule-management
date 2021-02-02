import { v4 as uuidv4 } from "uuid";
import { Delete, Close, Save } from "@material-ui/icons";
import { AppBar, Toolbar, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { useRxData, useRxDocument, useRxCollection } from "rxdb-hooks";
import * as R from "ramda";
import { formatISO } from "date-fns";

const FooterBar = ({ handleSubmit, task }) => {
  const classes = useStyles();
  const { listId, taskId, newTask } = useParams();
  const history = useHistory();

  const { result: tags } = useRxData("tags", (collection) => collection.find());
  const { result: subtasks } = useRxData("subtasks", (collection) =>
    collection.find().where("task_id").equals(taskId)
  );
  const { result: task_tags } = useRxData("task_tags", (collection) =>
    collection.find().where("task_id").equals(taskId)
  );

  const todos = useRxCollection("todos");

  const document = useRxDocument("todos", taskId);

  const handleDelete = async () => {
    await document.remove();
    subtasks.map(async (subtask) => await subtask.remove());
    task_tags.map(async (task_tag) => await task_tag.remove());
    console.log(document.deleted);
  };

  const redirectToList = () => {
    history.push(`/${listId}`);
  };

  const onSubmit = async (data) => {
    document
      ? await document.atomicUpdate((oldData) => {
          oldData.name = data.name;
          oldData.updated_at = formatISO(new Date());
          oldData.status_id = data.status;
          oldData.priority_id = data.priority;
          oldData.notes = data.notes;
          oldData.scheduled = data.scheduled;
          oldData.duration = data.duration;
          oldData.due = data.due;
          oldData.reminder = data.reminder;
        })
      : await todos.insert({
          id: newTask,
          name: data.name,
          updated_at: formatISO(new Date()),
          status_id: data.status,
          priority_id: data.priority,
          notes: data.notes,
          scheduled: data.scheduled,
          duration: data.duration,
          due: data.due,
          reminder: data.reminder,
        });

    console.log(todos[listId]);
    console.log(tags);
  };

  const deleteIcon = (
    <IconButton name="delete" color="inherit" onClick={handleDelete}>
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
              handleSubmit(onSubmit)();
              redirectToList();
            }}
          >
            <Save />
          </IconButton>
          <IconButton name="cancle" color="inherit" onClick={redirectToList}>
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
