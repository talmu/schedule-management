import { Chip, Collapse, Grid } from "@material-ui/core";
import Subtasks from "./Subtasks";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const ItemTags = ({ todoList, taskId }) => {
  const tags = todoList.data[taskId].tags;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const subtasksLen = todoList.data[taskId].subtasks.length;

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
        {tags.length > 0
          ? tags.map((tag) => {
              const key = `${taskId}-${tag.title}`;
              return (
                <Grid item key={key}>
                  <Chip size="small" label={tag.title} color="secondary" />
                </Grid>
              );
            })
          : null}
      </Grid>
      {subtasksLen !== 0 ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Subtasks todoList={todoList} taskId={taskId} />
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
