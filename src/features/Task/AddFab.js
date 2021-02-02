import { useHistory } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const AddFab = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Fab
      key="fab-add"
      color="primary"
      aria-label="add"
      className={classes.fab}
      onClick={() => {
        history.push("/add-task");
      }}
    >
      <Add />
    </Fab>
  );
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default AddFab;
