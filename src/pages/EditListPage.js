import { TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useList } from "../data/DBHooks";
import BasicToolbar from "../components/BasicToolbar";
import { useEffect, useState } from "react";

const EditListPage = () => {
  const classes = useStyles();
  const { listId } = useParams();
  const list = useList(listId);
  const [listName, setListName] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (list) setListName(list.name);
  }, [list]);

  const redirectToList = () => history.push(`/list/${listId}`);

  const handleSave = async () => {
    if (listName) {
      await list.atomicPatch({ name: listName });
      redirectToList();
    } else setError(!error);
  };

  const handleChange = (e) => {
    if (error && e.target.value) {
      setError(false);
    } else if (!e.target.value) setError(true);
    setListName(e.target.value);
  };

  return (
    <div>
      <TextField
        id="listName"
        className={classes.margin}
        label="List Name"
        style={{ width: "90%" }}
        helperText={error ? "List Name Can't be empty." : ""}
        fullWidth
        value={listName}
        onChange={handleChange}
        error={error}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <BasicToolbar handleOk={handleSave} redirect={redirectToList} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}));

export default EditListPage;
