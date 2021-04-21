import { Toolbar, IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar } from "@material-ui/core";
import { useRxDocument } from "rxdb-hooks";
import { useParams } from "react-router-dom";
import MoreMenu from "./MoreMenu";

const Bar = ({ openMenu }) => {
  const classes = useStyles();
  const history = useHistory();
  const pathname = history.location.pathname;

  const match = useRouteMatch({
    path: "/list/:listId",
    strict: true,
    sensitive: true,
  });

  const isExact = match ? match.isExact : false;
  const listId = isExact ? pathname.slice(6) : null;

  const ListTitle = () => {
    const { listId } = useParams();
    const { result: list } = useRxDocument("lists", listId);

    return list ? list.name : "";
  };

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
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.typography}>
          <Switch>
            <Route exact path="/list/add-list">
              Add List
            </Route>
            <Route exact path="/tag/tasks-tag/:tagId">
              Tasks Tag
            </Route>
            <Route exact path="/task/add-task/:listId">
              Add Task
            </Route>
            <Route exact path="/task/edit-task/:listId/:taskId">
              Edit Task
            </Route>
            <Route exact path="/list/:listId">
              <ListTitle />
            </Route>
            <Route exact path="/">
              My Tasks
            </Route>
          </Switch>
        </Typography>
        {isExact ? <MoreMenu listId={listId} /> : null}
      </Toolbar>
    </AppBar>
  );
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
  typography: {
    flexGrow: 1,
  },
}));

export default Bar;
