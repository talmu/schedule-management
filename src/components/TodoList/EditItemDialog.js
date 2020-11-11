import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery, InputLabel, FormControl, OutlinedInput } from '@material-ui/core';

function EditItemDialog(props){

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [name, setName] = React.useState("");
    const handleChange = (event) => {
        setName(event.target.value);
      };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleEditClick = () => {

    }
    return(
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="add-item">Edit Task</DialogTitle>
            <DialogContent>
                <form>
                    <FormControl varient="outlined">
                        <InputLabel htmlFor="task-name">Task Name</InputLabel>
                        <OutlinedInput id="task-name" value={name} onChange={handleChange} label="Name" />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Cancle
                </Button>
                <Button onClick={handleEditClick} color="primary" autoFocus>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditItemDialog;