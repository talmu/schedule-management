import { TextField, AppBar, Grid } from "@material-ui/core";
import { IconButton, Toolbar } from "@material-ui/core";
import { Save, Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useRxCollection } from "rxdb-hooks";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";

const AddListPage = () => {
  const classes = useStyles();

  const [listName, setListName] = useState("");
  const [error, setError] = useState(false);
  const listCollection = useRxCollection("lists");
  const history = useHistory();

  const redirectToMain = () => history.push("/");

  const handleSave = async () => {
    if (listName) {
      await listCollection.atomicUpsert({ id: uuidv4(), name: listName });
      redirectToMain();
    } else setError(!error);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
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
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <IconButton name="submit" color="inherit" onClick={handleSave}>
              <Save />
            </IconButton>
            <IconButton name="cancle" color="inherit" onClick={redirectToMain}>
              <Close />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  margin: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}));

export default AddListPage;
