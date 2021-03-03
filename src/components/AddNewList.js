import { IconButton, InputBase, Box } from "@material-ui/core";
import { AddCircle, Check, Close } from "@material-ui/icons";
import { useState } from "react";
import { useRxCollection } from "rxdb-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

const AddNewList = () => {
  const classes = useStyles();

  const [listName, setListName] = useState("");
  const listCollection = useRxCollection("lists");

  const handleAdd = async () => {
    if (listName) {
      await listCollection.atomicUpsert({ id: uuidv4(), name: listName });
      setListName("");
    }
  };

  return (
    <Box display="flex" alignItems="flex-end">
      <Box>
        <IconButton className={classes.iconButton} aria-label="menu">
          <AddCircle />
        </IconButton>
      </Box>
      <Box>
        <InputBase
          className={classes.input}
          placeholder="Type Name"
          inputProps={{ "aria-label": "add new list" }}
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
      </Box>
      <Box>
        <IconButton
          edge="end"
          aria-label="add"
          className={classes.iconButton}
          onClick={handleAdd}
        >
          <Check />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          edge="end"
          aria-label="cancle"
          className={classes.iconButton}
          onClick={() => setListName("")}
        >
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  iconButton: {
    marginTop: theme.spacing(1),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
}));

export default AddNewList;
