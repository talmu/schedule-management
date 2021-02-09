import { Delete, Close, Save } from "@material-ui/icons";
import { AppBar, Toolbar, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { useRxData, useRxDocument, useRxCollection } from "rxdb-hooks";
import * as R from "ramda";

const FooterBar = ({ handleSubmit, document }) => {
  const classes = useStyles();
  const { listId, taskId } = useParams();
  const history = useHistory();

  const { result: tags } = useRxData("tags", (collection) => collection.find());
  const subtasksCollection = useRxCollection("subtasks");

  const { result: subtasks } = useRxData("subtasks", (collection) =>
    collection.find().where("task_id").equals(taskId)
  );

  const { result: task_tags } = useRxData("task_tags", (collection) =>
    collection.find().where("task_id").equals(taskId)
  );

  const handleDelete = async () => {
    subtasks.map(async (subtask) => await subtask.remove());
    task_tags.map(async (task_tag) => await task_tag.remove());
    await document.remove();
    console.log(document.deleted);
  };

  const redirectToList = () => {
    history.push(`/${listId}`);
  };

  const onSubmit = async (data) => {
    // await document.save();

    console.log(data);
    console.log(document);

    // if (!taskId) {
    //   data.tags.map((task_tag) =>
    //     task_tags.atomicUpsert({
    //       task_id: document.id,
    //       tag_id: task_tag.tag_id,
    //     })
    //   );

    //   data.tags.map(async (tag) => {
    //     const newTag = { id: tag.tag_id, text: tag.text };
    //     if (!R.contains(newTag, tags)) await tags.atomicUpsert(newTag);
    //   });

    //   data.subtasks.map(
    //     async (subtask) =>
    //       await subtasksCollection.atomicUpsert({
    //         task_id: document.id,
    //         name: subtask.name,
    //         done: subtask.done,
    //       })
    //   );
    // }
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
