import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import TimeTable from "./TimeTable";
import Priority from "./Priority";
import FooterBar from "./FooterBar";
import Tags from "./Tags";
import { status } from "../../data/data";
import EditableSubtasks from "./EditableSubtasks";

const Task = ({ task }) => {
  const classes = useStyles();

  const tags = useSelector((state) => state.tags);
  const todos = useSelector((state) => state.todos);

  // form validation rules
  const validationSchema = yup.object().shape({
    name: yup.string().required("Task name is required"),
  });

  const { control, register, handleSubmit, errors } = useForm({
    defaultValues: {
      subtasks: task.subtasks,
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <div style={{ width: "88%" }} className={classes.marginLeft}>
      <form className={classes.root}>
        <TextField
          key="name"
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          defaultValue={task.name}
          inputRef={register({ required: true })}
          className={classes.marginTop}
        />
        <p>{errors.name?.message}</p>
        <TextField
          key="select"
          name="status"
          label="Status"
          variant="outlined"
          fullWidth
          defaultValue={task.status}
          select
          SelectProps={{
            native: true,
          }}
          inputRef={register({ required: true })}
        >
          {status.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </TextField>
        <Divider />
        <EditableSubtasks control={control} />
        <Divider />
        <Priority control={control} taskPriority={task.priority} />
        <Divider />
        <TextField
          key="task-notes"
          name="notes"
          label="Notes"
          variant="outlined"
          multiline
          fullWidth
          defaultValue={task.notes}
          rows={4}
          inputRef={register}
        />
        <Divider />
        <Tags control={control} tags={tags} defaultTags={task.tags} />
        <Divider />
        <TimeTable register={register} task={task} />
      </form>
      <FooterBar
        handleSubmit={handleSubmit}
        task={task}
        tags={tags}
        todos={todos}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

export default Task;
