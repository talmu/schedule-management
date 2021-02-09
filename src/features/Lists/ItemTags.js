import { Chip, Collapse, Grid } from "@material-ui/core";
import Subtasks from "./Subtasks";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useRxData, useRxDocument } from "rxdb-hooks";
import Loading from "../../components/Loading";
import * as R from "ramda";

const ItemTags = ({ todo }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const { result: subtasks, isFetching: isSubtasks } = useRxData(
    "subtasks",
    (collection) => collection.find().where("task_id").equals(todo.id)
  );

  const { result: task_tags, isFetching: isTags } = useRxData(
    "task_tags",
    (collection) => collection.find().where("task_id").equals(todo.id)
  );

  const tags = Promise.all(
    task_tags.map(async (task_tag) => await task_tag.tag_id_)
  );

  const subtasksLen = subtasks.length;
  const isFetching = isSubtasks || isTags;

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
        {/* {tags.map((tag, index) => (
          <Grid item key={index}>
            <Chip size="small" label={tag.text} color="secondary" />
          </Grid>
        ))} */}
      </Grid>
      {subtasksLen !== 0 ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Subtasks todo={todo} />
        </Collapse>
      ) : null}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  grid: {
    // padding: theme.spacing(1.5),
    marginLeft: theme.spacing(6),
    marginBottom: theme.spacing(1),
  },
}));

export default ItemTags;
