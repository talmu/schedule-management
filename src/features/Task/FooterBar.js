import { Delete, Close, Save } from "@material-ui/icons";
import { AppBar, Toolbar, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { useRxCollection } from "rxdb-hooks";
import * as R from "ramda";
import { useTaskTags } from "../../data/DBHooks";
import Loading from "../../components/Loading";
import { v4 as uuidv4 } from "uuid";

const FooterBar = ({ handleSubmit, document, subtasks }) => {
  const classes = useStyles();
  const { listId, taskId } = useParams();
  const history = useHistory();
  const [task_tags, isFetching] = useTaskTags(taskId);

  const subtasksCollection = useRxCollection("subtasks");
  const tagsCollection = useRxCollection("tags");
  const taskTagsCollection = useRxCollection("task_tags");

  const redirectToList = () => {
    history.push(`/${listId}`);
  };

  const handleDelete = async () => {
    console.log(subtasks, task_tags);

    subtasks.map(async (subtask) => await subtask.remove());
    task_tags.map(async (task_tag) => await task_tag.remove());

    // const subtasksToRemove = subtasks.map((subtask) => subtask.id);
    // const taskTagsToRemove = task_tags.map((task_tag) => task_tag.id);

    // if (subtasksToRemove.length > 0)
    //   await subtasksCollection.bulkRemove(subtasksToRemove);
    // if (taskTagsToRemove.length > 0)
    //   await taskTagsCollection.bulkRemove(taskTagsToRemove);
    await document.remove();

    redirectToList();
  };

  const onSubmit = (data) => {
    console.log(data);

    taskId ? EditDocument(data) : AddDocument(data);

    redirectToList();
  };

  const EditDocument = async (data) => {
    await document.atomicPatch({
      name: data.name,
      status_id: data.status_id,
      priority_id: data.priority_id,
      notes: data.notes,
      reminder: data.reminder,
      due: data.due,
      duration: data.duration,
      scheduled: data.scheduled,
    });
  };

  const AddDocument = async (data) => {
    document.name = data.name;
    document.status_id = data.status_id;
    document.priority_id = data.priority_id;
    document.notes = data.notes;
    document.reminder = data.reminder;
    document.due = data.due;
    document.duration = data.duration;
    document.scheduled = data.scheduled;
    document.list_id = listId;

    await document.save();

    const existTags = data.tags.filter((tag) => tag.id !== undefined);
    const newTags = R.difference(data.tags, existTags);
    const uuidArr = Array.from({ length: newTags.length }, () => uuidv4());

    console.log(existTags, newTags, uuidArr);

    const existTaskTagsToAdd = existTags.map((tag) => {
      return { task_id: document.id, tag_id: tag.id };
    });

    const newTaskTagsToAdd = newTags.map((tag, index) => {
      return { task_id: document.id, tag_id: uuidArr[index] };
    });

    const tagsToAdd = newTags.map((tag, index) => {
      return { id: uuidArr[index], text: tag.text };
    });

    const finalTaskTags = R.concat(existTaskTagsToAdd, newTaskTagsToAdd);
    await tagsCollection.bulkInsert(tagsToAdd);
    await taskTagsCollection.bulkInsert(finalTaskTags);

    if (data.subtasks) {
      const subtasksToAdd = data.subtasks.map((subtask) => {
        return { task_id: document.id, name: subtask.name, done: subtask.done };
      });

      await subtasksCollection.bulkInsert(subtasksToAdd);
    }
  };

  const deleteIcon = (
    <IconButton name="delete" color="inherit" onClick={handleDelete}>
      <Delete />
    </IconButton>
  );

  return isFetching ? (
    <Loading />
  ) : (taskId && task_tags) || !taskId ? (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          {taskId ? deleteIcon : null}
          <IconButton
            name="submit"
            color="inherit"
            onClick={() => {
              handleSubmit(onSubmit)();
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
  ) : (
    <Loading />
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

export default FooterBar;
