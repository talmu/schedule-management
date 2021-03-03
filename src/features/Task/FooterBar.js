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

    const promises = R.concat(
      subtasks.map((subtask) => subtask.remove()),
      task_tags.map((task_tag) => task_tag.remove())
    );

    await Promise.all(promises);
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
    R.forEachObjIndexed(
      (value, key) => document.set(key, value),
      R.omit(["subtasks", "tags"], data)
    );

    document.list_id = listId;

    await document.save();
    const [existTags, newTags] = R.partition(R.has("id"), data.tags);

    const tagsToCreate = newTags.map((tag) => {
      return { id: uuidv4(), text: tag.text };
    });

    const newTaskTagsToAdd = tagsToCreate.map((tag) => {
      return { task_id: document.id, tag_id: tag.id };
    });

    const existTaskTagsToAdd = existTags.map((tag) => {
      return { task_id: document.id, tag_id: tag.id };
    });

    const finalTaskTags = R.concat(existTaskTagsToAdd, newTaskTagsToAdd);
    await tagsCollection.bulkInsert(tagsToCreate);
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
