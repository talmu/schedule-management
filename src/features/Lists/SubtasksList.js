import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/store";
import { ListItem, ListItemIcon, ListItemText, Chip } from "@material-ui/core";
import { Divider, Collapse, List, Checkbox } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const SubtasksList = ({ todoList, taskId }) => {
  const classes = useStyles();
  // const checkedSubtasks = useSelector((state) => state.nestedChecked);
  const [open, setOpen] = useState(false);
  const subtasks = todoList[taskId].subtasks;

  const handleChipClick = () => {
    setOpen(!open);
  };

  const subtasksChip = (
    <div>
      <Divider className={classes.marginTop} />
      <Chip
        className={classes.nestedList}
        label={`${subtasks.length} Subtasks`}
        variant="outlined"
        color="primary"
        icon={open ? <ExpandLess /> : <ExpandMore />}
        onClick={handleChipClick}
      />

      <Collapse in={open} timeout="auto" unmountOnExit></Collapse>
      <Divider className={classes.marginTop} />
    </div>
  );

  return <div>{subtasks.length !== 0 ? subtasksChip : ""}</div>;
};

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(1),
  },
  nestedSubtask: {
    marginLeft: theme.spacing(7),
  },
  nestedList: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default SubtasksList;
