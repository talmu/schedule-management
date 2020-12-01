import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { status, priority } from "../../data/data";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { actions } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import formatISO from "date-fns/formatISO";
import { v4 as uuidv4 } from "uuid";
import TimeTable from "./TimeTable";
import Priority from "./Priority";
import FooterBar from "./FooterBar";
import AddTags from "./AddTags";

const today = new Date();
const formattedDate = formatISO(today, { representation: "date" });

function AddItemDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const [tags, setTags] = useState();
  const currentTags = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  const handleClose = () => {
    props.setOpen(false);
  };

  // form validation rules
  const validationSchema = yup.object().shape({
    name: yup.string().required("Task name is required"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      priority: priority[3],
      scheduled: formattedDate,
      duration: "02:00",
      reminder: "00:00",
    },
  });

  const onSubmit = (data) => {
    const newTags = tags.filter((tag) => currentTags.indexOf(tag) === -1);

    newTags.map((tag) => dispatch(actions.addTag(tag)));

    const newTask = { id: uuidv4(), ...data, tags: tags };
    dispatch(actions.addTask({ newTask: newTask }));
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="add-item">Add New Task</DialogTitle>
      <DialogContent>
        <form className={classes.root}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            color="secondary"
            fullWidth
            inputRef={register({ required: true })}
          />
          <p>{errors.name?.message}</p>
          <TextField
            id="status"
            name="status"
            value={status[0]}
            label="Status"
            variant="outlined"
            color="secondary"
            fullWidth
            disabled
          ></TextField>
          <Divider />
          <Priority register={register} />
          <Divider />
          <TextField
            id="task-notes"
            name="notes"
            label="Notes"
            variant="outlined"
            multiline
            fullWidth
            rows={4}
            inputRef={register}
          />
          <Divider />
          <AddTags name="tags" register={register} setTags={setTags} />
          <Divider />
          <TimeTable register={register} />
          <FooterBar
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

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

export default AddItemDialog;
