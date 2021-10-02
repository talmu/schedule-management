import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import { useTasksTag } from "../../data/DBHooks";

const TagItem = ({ close, tag }) => {
  const [tasks, isFetching] = useTasksTag(tag.id);
  const history = useHistory();

  const handleClick = () => {
    history.push(`/tag/${tag.id}`);
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
      <Typography variant="caption" color="textSecondary">
        {tasks.length}
      </Typography>
    </ListItem>
  );
};

export default TagItem;
