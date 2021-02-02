import { Chip, Collapse, Grid } from "@material-ui/core";
import Subtasks from "./Subtasks";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useRxData } from "rxdb-hooks";
import * as R from "ramda";

const ItemTags = ({ todo }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const { result: subtasks } = useRxData("subtasks", (collection) =>
    collection.find().where("task_id").equals(todo.id)
  );
  const subtasksLen = subtasks.length;

  const { result: task_tags } = useRxData("task_tags", (collection) =>
    collection.find().where("task_id").equals(todo.id)
  );

  const { result: tags } = useRxData("tags", (collection) => collection.find());

  // const { result: tags } = useRxData("tags_master", (collection) =>
  //   collection.find().where("task_id").equals(todo.id)
  // );

  return (
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
        {task_tags.length > 0
          ? task_tags.map((task_tag, index) => {
              const key = `${index}-${task_tag.id}`;
              const text = R.find(R.propEq("id", task_tag.tag_id))(tags).text;

              return (
                <Grid item key={key}>
                  <Chip size="small" label={text} color="secondary" />
                </Grid>
              );
            })
          : null}
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
