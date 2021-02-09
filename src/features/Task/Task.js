import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Select, TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TimeTable from "./TimeTable";
import Priority from "./Priority";
import FooterBar from "./FooterBar";
import AddModeTags from "./AddModeTags";
import EditModeTags from "./EditModeTags";
import AddModeSubtasks from "./AddModeSubtasks";
import EditModeSubtasks from "./EditModeSubtasks";
import { useRxData } from "rxdb-hooks";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
// import * as R from "ramda";

const Task = ({ task, subtasks }) => {
  const { taskId } = useParams();
  const classes = useStyles();

  const { result: status, isFetching } = useRxData("status", (collection) =>
    collection.find()
  );

  // form validation rules
  const validationSchema = yup.object().shape({
    name: yup.string().required("Task name is required"),
  });

  const { control, register, handleSubmit, errors } = useForm({
    defaultValues: {
      subtasks: subtasks,
    },
    resolver: yupResolver(validationSchema),
  });

  return isFetching ? (
    <Loading />
  ) : (
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
        <Priority control={control} taskPriority={task.priority_id} />
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
        {taskId ? <EditModeTags /> : <AddModeTags control={control} />}
        <Divider />
        <TimeTable register={register} task={task} />
      </form>
      <FooterBar handleSubmit={handleSubmit} task={task} />
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
