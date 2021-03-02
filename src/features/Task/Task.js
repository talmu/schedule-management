import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TimeTable from "./TimeTable";
import Priority from "./Priority";
import FooterBar from "./FooterBar";
import AddModeTags from "./AddModeTags";
import EditModeTags from "./EditModeTags";
import AddModeSubtasks from "./AddModeSubtasks";
import EditModeSubtasks from "./EditModeSubtasks";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useStatus, usePriorities, useTags } from "../../data/DBHooks";

const Task = ({ task, subtasks }) => {
  const { taskId } = useParams();
  const classes = useStyles();

  const [status, isStatusFetching] = useStatus();
  const [priority, isPriorityFetching] = usePriorities();
  const [tags, isTagsFetching] = useTags();

  let isFetching = isStatusFetching || isPriorityFetching || isTagsFetching;

  // form validation rules
  const validationSchema = yup.object().shape({
    name: yup.string().required("Task name is required"),
  });

  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return isFetching ? (
    <Loading />
  ) : (
    <div style={{ width: "88%" }} className={classes.form}>
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
          name="status_id"
          label="Status"
          variant="outlined"
          fullWidth
          select
          defaultValue={task.status_id}
          SelectProps={{
            native: true,
          }}
          inputRef={register({ required: true })}
        >
          {status.map((s) => (
            <option key={s.id} value={s.id}>
              {s.text}
            </option>
          ))}
        </TextField>
        <Divider />
        {taskId ? (
          <EditModeSubtasks subtasks={subtasks} />
        ) : (
          <AddModeSubtasks control={control} />
        )}
        <Divider />
        <Priority
          control={control}
          taskPriority={task.priority_id}
          priority={priority}
        />
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
        {taskId ? (
          <EditModeTags tags={tags} />
        ) : (
          <AddModeTags control={control} tags={tags} />
        )}
        <Divider />
        <TimeTable register={register} task={task} />
      </form>
      <FooterBar
        handleSubmit={handleSubmit}
        document={task}
        subtasks={subtasks}
        errors={errors}
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
  form: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(8),
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

export default Task;
