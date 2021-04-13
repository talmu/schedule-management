import { TextField } from "@material-ui/core";
import { DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { Dialog, Button } from "@material-ui/core";
import { useState } from "react";

const EditList = ({ open, setOpen, listObj }) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState(listObj.name);

  const handleEdit = async () => {
    if (!error) await listObj.atomicPatch({ name: name });
  };

  const handleChange = (e) => {
    setName(e.target.value);
    e.target.value ? setError(false) : setError(true);
  };

  const handleCancle = () => {
    setOpen();
    setName(listObj.name);
    setError(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={setOpen} disableBackdropClick>
        <DialogTitle id="alert-dialog-title">Rename List</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-basic"
            error={error}
            onChange={handleChange}
            value={name}
            helperText={error ? "Invalid Name" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancle} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleEdit();
              setOpen();
            }}
            color="primary"
            autoFocus
            disabled={error}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditList;
