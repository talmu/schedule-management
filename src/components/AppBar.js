import { Toolbar, IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar } from "@material-ui/core";
import { useRxDocument } from "rxdb-hooks";
import { useParams } from "react-router-dom";
import MoreMenu from "./MoreMenu";

const Bar = ({ openMenu }) => {
  const classes = useStyles();

  const matchList = useRouteMatch({ path: "/list/:listId", exact: true });
  const matchTag = useRouteMatch("/tag/:tagId");

  const isListPage = matchList ? matchList.isExact : false;
  const listId = isListPage ? matchList.params.listId : null;

  const isTagPage = matchTag ? matchTag.isExact : false;
  const tagId = isTagPage ? matchTag.params.tagId : null;

  const ListTitle = () => {
    const { listId } = useParams();
    const { result: list } = useRxDocument("lists", listId);

    return list ? list.name : "";
  };

  const TagTitle = () => {
    const { tagId } = useParams();
    const { result: tag } = useRxDocument("tags", tagId);

    return tag ? tag.text : "";
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
            <Route exact path="/">
              My Tasks
            </Route>
            <Route exact path="/list/:listId">
              <ListTitle />
            </Route>
            <Route exact path="/add-list">
              Add List
            </Route>
            <Route exact path="/edit-list/:listId">
              Edit List
            </Route>
            <Route exact path="/delete-list/:listId">
              Delete List
            </Route>
            <Route exact path="/add-task/:listId">
              Add Task
            </Route>
            <Route exact path="/edit-task/:listId/:taskId">
              Edit Task
            </Route>
            <Route exact path="/tag/:tagId">
              <TagTitle />
            </Route>
            <Route exact path="/add-tag">
              Add Tag
            </Route>
            <Route exact path="/edit-tag/:tagId">
              Edit Tag
            </Route>
            <Route exact path="/delete-tag/:tagId">
              Delete Tag
            </Route>
          </Switch>
        </Typography>
        {isListPage ? <MoreMenu obj={"List"} id={listId} /> : null}
        {isTagPage ? <MoreMenu obj={"Tag"} id={tagId} /> : null}
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
