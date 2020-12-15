import { useForm, Controller } from "react-hook-form";
import React, { useEffect } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { TextField, useMediaQuery } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import TimeTable from "./TimeTable";
import Priority from "./Priority";
import FooterBar from "./FooterBar";
import Tags from "./Tags";
import { status } from "../../data/data";

const ItemDialog = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const tags = useSelector((state) => state.tags);
  const todos = useSelector((state) => state.todos);
  const selectedIndex = useSelector((state) => state.selectedIndex);
  const selected = useSelector((state) => state.selectedTask);
  const mode = selected !== -1 ? "Edit" : "Add";

  console.log(selected);
  console.log(props.task);

  // form validation rules
  const validationSchema = yup.object().shape({
    name: yup.string().required("Task name is required"),
  });

  const {
    control,
    register,
    handleSubmit,
    errors,
    setValue,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     const fields = [
  //       "name",
  //       "status",
  //       "priority",
  //       "notes",
  //       "scheduled",
  //       "duration",
  //       "reminder",
  //       "tags",
  //     ];
  //     fields.forEach((field) => setValue(field, props.task[field]));
  //   });
  // }, [setValue, props.open, props.task]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="add-item">{`${mode} Task`}</DialogTitle>
      <DialogContent>
        <form className={classes.root}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            color="secondary"
            fullWidth
            defaultValue={props.task.name}
            inputRef={register({ required: true })}
          />
          <p>{errors.name?.message}</p>
          <Controller
            name="status"
            as={Autocomplete}
            defaultValue={props.task.status}
            disabled={selected === -1 ? false : true}
            options={status}
            control={control}
            getOptionLabel={(option) => option}
            style={{ width: 310 }}
            renderInput={(params) => (
              <TextField {...params} label="Status" variant="outlined" />
            )}
          />
          <Divider />
          <Priority control={control} priority={props.task.priority} />
          <Divider />
          <TextField
            id="task-notes"
            name="notes"
            label="Notes"
            variant="outlined"
            multiline
            fullWidth
            defaultValue={props.task.notes}
            rows={4}
            inputRef={register}
          />
          <Divider />
          <Tags control={control} tags={tags} defaultTags={props.task.tags} />
          <Divider />
          <TimeTable register={register} task={props.task} />
          <FooterBar
            setOpen={props.setOpen}
            handleSubmit={handleSubmit}
            task={props.task}
            tags={tags}
            todos={todos}
            selectedIndex={selectedIndex}
            selectedTask={selected}
            mode={mode}
            formState={formState}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

export default ItemDialog;
