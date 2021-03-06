import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useRxCollection } from "rxdb-hooks";
import { v4 as uuidv4 } from "uuid";
import BasicToolbar from "../components/BasicToolbar";

import { useState } from "react";

const AddListPage = () => {
  const classes = useStyles();

  const [listName, setListName] = useState("");
  const [error, setError] = useState(false);
  const listCollection = useRxCollection("lists");
  const history = useHistory();

  const redirectToMain = () => history.push("/");

  const handleAdd = async () => {
    if (listName) {
      await listCollection.atomicUpsert({ id: uuidv4(), name: listName });
      redirectToMain();
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

export default AddListPage;
