import React from 'react';
import { useForm } from 'react-hook-form';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogTitle, DialogContent, useMediaQuery, TextField, RadioGroup, FormControl, 
        FormControlLabel, Radio, FormLabel, Divider } from '@material-ui/core';
import { status, priority } from '../../data/data';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
      },
  }));

function AddItemDialog(props){

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    const today = new Date();
    const formattedDate = today.getFullYear() + "-" + parseInt(today.getMonth()+1) + "-" + today.getDate();
    const hours = today.getHours() < 10 ? "T0" + today.getHours() + ":" : "T" + today.getHours() + ":";
    const minuetes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const formattedDateTime = formattedDate + hours + minuetes;             
    const dateTimeDue = today.getFullYear() + "-" + parseInt(today.getMonth()+1) + "-" + (today.getDate() + 1) + hours + minuetes;

    const selected = props.tasks[props.selectedIndex];
    
    const handleClose = () => { props.setOpen(false); }; 

    // form validation rules 
    const validationSchema = yup.object().shape({
        name: yup.string().required('Task name is required')});
        
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            priority: priority[3],
            scheduled: formattedDate,
            duration: "02:00",
            due: dateTimeDue,
            reminder: formattedDateTime,
        }});

    const onSubmit = data => {
        const newTask = {
            id: selected.data.length + 1,
            name: data.name,
            status: status[0],
            priority: data.priority,
            notes: data.notes,
            scheduled: data.scheduled,
            duration: data.duration,
            due: data.due,
            reminder: data.reminder
        };

        const newSelectedArr = [...selected.data, newTask];
        const newTasksArr = [...props.tasks];
        newTasksArr[props.selectedIndex].data = newSelectedArr;
        props.updateTasks(newTasksArr);

        handleClose();
    }

    return(
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="add-item">Add New Task</DialogTitle>
            <DialogContent>
                <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                    <TextField id="name" name="name" label="Name" variant="outlined" color="secondary" fullWidth inputRef={register({ required: true })}/>
                    <p>{errors.name?.message}</p>
                    <TextField id="status" name="status" value={status[0]} label="Status" variant="outlined" color="secondary" fullWidth disabled></TextField>
                    <Divider/>
                    <FormControl name="priority" component="fieldset" className="col-12" ref={register}>
                        <FormLabel name="priority-label" component="legend" className="ml-1">Priority</FormLabel>
                        <RadioGroup row value={priority[3]}>
                            { priority.map((p, index) => (
                                <FormControlLabel key={index} name={p} value={p} control={<Radio color="secondary" />} label={p} labelPlacement="bottom"/>
                            )) }
                        </RadioGroup>
                    </FormControl>
                    <Divider/>
                    <TextField id="task-notes" name="notes" label="Notes" variant="outlined" multiline fullWidth rows={4} inputRef={register}/>
                    <Divider/>
                    <TextField id="task-schedule" name="scheduled" label="Scheduled" type="date" className="mr-4"
                        InputLabelProps={{ shrink: true, }} inputRef={register}></TextField>
                    <TextField id="task-duration" name="duration" label="Duration" type="time"
                        InputLabelProps={{ shrink: true, }} inputRef={register}></TextField>
                    <TextField id="task-due" name="due" label="Due" type="datetime-local"
                        InputLabelProps={{ shrink: true, }} inputRef={register} ></TextField>
                    <TextField id="task-reminder" name="reminder" label="Reminder" type="datetime-local"
                        InputLabelProps={{ shrink: true, }} inputRef={register}></TextField>

                    <div className="d-flex justify-content-end mt-3">
                        <input name="cancel" type="button" value="Cancel" onClick={handleClose} className="btn btn-primary text-white"></input>
                        <input name="submit" type="submit" value="Add" className="btn btn-primary text-white ml-2"></input>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );

}

export default AddItemDialog;

