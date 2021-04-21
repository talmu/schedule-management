import Loading from "../components/Loading";
import TagsList from "../features/Tags/TagsList";
import { useTags, useLists } from "../data/DBHooks";
import Lists from "../features/Lists/Lists";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const MenuBar = ({ close }) => {
  const [tags, isTagsFetching] = useTags();
  const [lists, isListsFetching] = useLists();
  const classes = useStyles();

  return isTagsFetching || isListsFetching ? (
    <Loading />
  ) : (
    <div>
      <div className={classes.toolbar}></div>
      <Divider />
      <Lists close={close} lists={lists} />
      <TagsList close={close} tags={tags} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export default MenuBar;
