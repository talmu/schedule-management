import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRxDB } from "rxdb-hooks";
import { useHistory } from "react-router-dom";

const DeleteList = ({ open, setOpen, listId, listObj }) => {
  const db = useRxDB();
  const history = useHistory();

  const handleConfirm = () => {
    handleDelete();
    setOpen();
    history.push("/");
  };

  const handleDelete = async () => {
    const query = db.todos.find().where("list_id").equals(listId);
    const todos = await query.exec();
    console.log(todos);
    todos.map((todo) => deleteTodo(todo));
    await listObj.remove();
  };

  const deleteTodo = async (todo) => {
    deleteTags(todo);
    deleteSubtasks(todo);
    todo.remove();
  };

  const deleteTags = async (todo) => {
    const query = db.task_tags.find().where("task_id").equals(todo.id);
    const task_tags = await query.exec();
    await Promise.all(task_tags.map((task_tag) => task_tag.remove()));
  };

  const deleteSubtasks = async (todo) => {
    const query = db.subtasks.find().where("task_id").equals(todo.id);
    const subtasks = await query.exec();
    await Promise.all(subtasks.map((subtask) => subtask.remove()));
  };

  return (
    <div>
      <Dialog open={open} onClose={setOpen}>
        <DialogTitle id="alert-dialog-title">Delete List</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure? All items will delete permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteList;
