
import React, { useState} from 'react';
import TodoList from './TodoList';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Drawer, CssBaseline, List, Divider, Typography, ListItem, ListItemIcon, ListItemText, IconButton, Hidden } from '@material-ui/core';
import {Menu, Functions, SortByAlpha, ImportContacts, Dvr} from '@material-ui/icons';
import { status, tasksData } from '../../data/data';
    
    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
        },
        drawer: {
          [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
          },
        },
        appBar: {
          [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
          },
        },
        menuButton: {
          marginRight: theme.spacing(2),
          [theme.breakpoints.up('sm')]: {
            display: 'none',
          },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
          width: drawerWidth,
        },
        content: {
          flexGrow: 1,
          padding: theme.spacing(3),
        },
      }));
      
function DrawerApp(props){ 

    const [tasks, updateTasks] = useState(tasksData);
    const [title, setTitle] = useState("Schedule Management");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const container = window !== undefined ? () => window().document.body : undefined;

    const handleListItemClick = (index) => (event) => {
        handleDrawerToggle();
        setSelectedIndex(index);
        setTitle(tasks[selectedIndex].subject + " List");
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button key="Math" selected={ selectedIndex === 0} onClick={handleListItemClick(0)}>
                    <ListItemIcon><Functions /></ListItemIcon>
                    <ListItemText primary="Math" />
                </ListItem>
                <ListItem button key="Hebraw" selected={ selectedIndex === 1} onClick={handleListItemClick(1)}>
                    <ListItemIcon><ImportContacts /></ListItemIcon>
                    <ListItemText primary="Hebraw" />
                </ListItem>
                <ListItem button key="English" selected={ selectedIndex === 2} onClick={handleListItemClick(2)}>
                    <ListItemIcon><SortByAlpha/></ListItemIcon>
                    <ListItemText primary="English" />
                </ListItem>
                <ListItem button key="Computer" selected={ selectedIndex === 3} onClick={handleListItemClick(3)}>
                    <ListItemIcon><Dvr/></ListItemIcon>
                    <ListItemText primary="Computer" />
                </ListItem>
            </List>
        </div>
    );

    return(
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {title}
                </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{ paper: classes.drawerPaper }}
                        variant="permanent"
                        open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <TodoList tasks={tasks} updateTasks={updateTasks} selectedIndex={selectedIndex} status={status}/>
            </main>
        </div>
    );
}

export default DrawerApp;