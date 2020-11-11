import React, { useState} from 'react';
import {Add, Edit} from '@material-ui/icons';
import { Fab, List, ListItem, ListItemIcon, ListItemText, Checkbox, ListItemSecondaryAction, IconButton} from '@material-ui/core';
import AddItemDialog from './AddItemDialog';
import EditItemDialog from './EditItemDialog';
import { makeStyles } from '@material-ui/core/styles';
import { status } from '../../data/data';

    const useStyles = makeStyles((theme) => ({
            root: {
                width: '100%',
                maxWidth: 360,
            },
            fab: {
                position: 'absolute',
                bottom: theme.spacing(2),
                right: theme.spacing(2),
            },
        }));

    function TodoList(props) {

        const classes = useStyles();

        const [addOpen, setAddOpen] = useState(false);
        const [editOpen, setEditOpen] = useState(false);
        const selected = props.tasks[props.selectedIndex];
        const [checked, setChecked] = useState([0]);
        
        const handleCheckboxClick = (task) => (event) => {
           
            const currentIndex = checked.indexOf(task);
            const newChecked = [...checked];
            const newTasks = [...props.tasks];
            newTasks[props.selectedIndex] = selected;

            if (currentIndex === -1) {
                newChecked.push(task);
                selected.data[task.id-1].status = status[2];
            } else {
                newChecked.splice(currentIndex, 1);
                selected.data[task.id-1].status = status[0];
            }            
            
            props.updateTasks(newTasks);
            setChecked(newChecked);
        }

        const handleAddClick = (newTask) => {
            const newArr = [...props.tasks];
            selected.data.push(newTask);
            newArr[props.selectedIndex] = selected;
            props.updateTasks(newArr);
        }

        const handleEditClick = (currentTask => {

        });

        return(
            <div>
                <List className={classes.root}>
                    { props.tasks[props.selectedIndex].data.map( (task) => {
                        const labelId = `checkbox-list-label-${task.id}`;

                        return(
                            <ListItem key={task.id} role={undefined} dense button onClick={handleCheckboxClick(task)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(task) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText className="text-wrap" id={labelId} primary={task.name}></ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={() => setEditOpen(true)}>
                                            <Edit/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                            </ListItem>
                        )})}
                </List>
                <Fab color="primary" aria-label="add" onClick={() => setAddOpen(true)} className={classes.fab}>
                    <Add />
                </Fab>

                 <AddItemDialog 
                    open={addOpen} 
                    setOpen={setAddOpen} 
                    tasks={props.tasks} 
                    selectedIndex={props.selectedIndex} 
                    updateTasks={props.updateTasks}
                    handleAddClick={handleAddClick}>
                </AddItemDialog>

                <EditItemDialog
                    open={editOpen} 
                    setOpen={setEditOpen} 
                    tasks={props.tasks} 
                    selectedIndex={props.selectedIndex} 
                    updateTasks={props.updateTasks}
                    handleEditClick={handleEditClick}>
                </EditItemDialog>
            </div>
        )
    }

    export default TodoList;