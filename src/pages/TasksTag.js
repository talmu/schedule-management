import { useTasksTag } from "../data/DBHooks";
import Loading from "../components/Loading";
import { List, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Item from "../features/Lists/Item";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const TasksTag = () => {
  const classes = useStyles();
  const { tagId } = useParams();
  const [tasks_tag, isFetching] = useTasksTag(tagId);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    Promise.all(
      tasks_tag.map(async (task_tag) => await task_tag.task_id_)
    ).then(setTasks);
  }, [tasks_tag]);

  return isFetching ? (
    <Loading />
  ) : (
    <div style={{ width: "95%" }}>
      {tasks.length > 0 ? (
        <List className={classes.list}>
          {tasks.map((task) => (
            <Item key={task.id} todo={task} />
          ))}
        </List>
      ) : (
        <Typography style={{ width: "90%" }} className={classes.emptyPage}>
          No Tasks
        </Typography>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  emptyPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    width: "100vw",
    fontSize: theme.typography.pxToRem(30),
    color: "lightgrey",
    marginLeft: theme.spacing(2),
  },
}));

export default TasksTag;
