import { useLists } from "../data/DBHooks";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListSubheader } from "@material-ui/core";
import TaskList from "../features/Lists/TaskList";
import Loading from "../components/Loading";

const Main = () => {
  const classes = useStyles();
  const [lists, isFetching] = useLists();

  return isFetching ? (
    <Loading />
  ) : (
    <div>
      <List key="todos" className={classes.list}>
        {lists.map((list) => {
          return (
            <div>
              <ListSubheader
                key={list.name}
              >{`${list.name} List`}</ListSubheader>
              <TaskList list_id={list.id} />
            </div>
          );
        })}
      </List>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default Main;
