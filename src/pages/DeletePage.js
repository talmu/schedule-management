import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BasicToolbar from "../components/BasicToolbar";
import { useHistory } from "react-router-dom";

const DeletePage = ({ handleDelete }) => {
  const classes = useStyles();
  const history = useHistory();

  const redirect = () => history.push("/");

  const handleOk = () => {
    handleDelete();
    redirect();
  };

  return (
    <div style={{ width: "95%" }}>
      <Typography className={classes.title}>Are you sure?</Typography>
      <Typography className={classes.subtitle}>
        All items will be deleted permanently.
      </Typography>
      <BasicToolbar handleOk={handleOk} redirect={redirect} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(22),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  subtitle: {
    fontSize: theme.typography.pxToRem(16),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
}));

export default DeletePage;
