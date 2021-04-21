import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import { useTasksTag } from "../../data/DBHooks";
import { makeStyles } from "@material-ui/core/styles";

const TagItem = ({ close, tag }) => {
  const [tasks, isFetching] = useTasksTag(tag.id);
  const history = useHistory();
  const classes = useStyles();

  const handleClick = () => {
    history.push(`/tag/tasks-tag/${tag.id}`);
    close();
  };

  return isFetching ? (
    <Loading />
  ) : (
    <ListItem button onClick={handleClick}>
      <ListItemIcon>
        <Label />
      </ListItemIcon>
      <ListItemText primary={tag.text} />
      <Chip label={tasks.length} />
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  fontSize: {
    fontSize: 5,
  },
}));

export default TagItem;
