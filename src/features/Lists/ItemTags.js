import { Chip, Collapse, Grid } from "@material-ui/core";
import Subtasks from "./Subtasks";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useSubtasks, useTaskTags } from "../../data/DBHooks";
import Loading from "../../components/Loading";

const ItemTags = ({ todo }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [tags, setTags] = useState([]);

  const [subtasks, isSubtasksFetching] = useSubtasks(todo.id);
  const [task_tags, isTagsFetching] = useTaskTags(todo.id);
  const isFetching = isSubtasksFetching || isTagsFetching;

  useEffect(() => {
    Promise.all(task_tags.map(async (task_tag) => await task_tag.tag_id_)).then(
      setTags
    );
  }, [task_tags]);

  const subtasksLen = subtasks.length;

  return isFetching ? (
    <Loading />
  ) : (
    <div style={{ width: "80%" }}>
      <Grid container spacing={1} className={classes.grid}>
        {subtasksLen !== 0 ? (
          <Grid item key="subtasks">
            <Chip
              label={`${subtasksLen} Subtasks`}
              variant="outlined"
              color="secondary"
              size="small"
              icon={open ? <ExpandLess /> : <ExpandMore />}
              onClick={() => setOpen(!open)}
            />
          </Grid>
        ) : null}
        {tags.map((tag, index) => (
          <Grid item key={index}>
            <Chip size="small" label={tag.text} color="secondary" />
          </Grid>
        ))}
      </Grid>
      {subtasksLen !== 0 ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Subtasks todo={todo} subtasks={subtasks} />
        </Collapse>
      ) : null}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  grid: {
    marginLeft: theme.spacing(8),
    marginBottom: theme.spacing(1),
  },
}));

export default ItemTags;
