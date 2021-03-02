import { Typography, Toolbar, IconButton } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import { AppBar } from "@material-ui/core";
import { useRxDocument } from "rxdb-hooks";

const Bar = ({ openMenu }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={openMenu}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap>
          <Switch>
            <Route path="/add-task">Add Task</Route>
            <Route path="/edit-task/:taskId">Edit Task</Route>
            <Route path="/:listId">
              <ListTitle />
            </Route>
          </Switch>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const ListTitle = () => {
  const { listId } = useParams();

  const { result: list } = useRxDocument("lists", listId);

  return list ? list.name : "Loading";
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default Bar;
