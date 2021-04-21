import { useTasksTag } from "../data/DBHooks";
import Loading from "../components/Loading";
import { List } from "@material-ui/core";
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
          {tasks.map((task) => {
            console.log(task.name);
            return <Item key={task.id} todo={task} />;
          })}
        </List>
      ) : (
        <div className={classes.container}>
          <div className={classes.item}>There is no tasks under this tag</div>
        </div>
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
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    width: "100vw",
  },
  item: {
    color: "lightgrey",
    fontSize: 25,
  },
}));

export default TasksTag;
