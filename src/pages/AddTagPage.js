import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useRxCollection } from "rxdb-hooks";
import { v4 as uuidv4 } from "uuid";
import BasicToolbar from "../components/BasicToolbar";

import { useState } from "react";

const AddTagPage = () => {
  const classes = useStyles();

  const [tagName, setTagName] = useState("");
  const [error, setError] = useState(false);
  const tagsCollection = useRxCollection("tags");
  const history = useHistory();

  const redirectToMain = () => history.push("/");

  const handleAdd = async () => {
    if (tagName) {
      await tagsCollection.atomicUpsert({ id: uuidv4(), text: tagName });
      redirectToMain();
    } else setError(!error);
  };

  const handleChange = (e) => {
    if (error && e.target.value) {
      setError(false);
    } else if (!e.target.value) setError(true);
    setTagName(e.target.value);
  };

  return (
    <div>
      <TextField
        id="tagName"
        className={classes.margin}
        label="Tag Name"
        style={{ width: "90%" }}
        helperText={error ? "Tag Name Can't be empty." : ""}
        fullWidth
        value={tagName}
        onChange={handleChange}
        error={error}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <BasicToolbar handleOk={handleAdd} redirect={redirectToMain} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}));

export default AddTagPage;
