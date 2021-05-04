import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import * as R from "ramda";

const MoreMenu = ({ obj, id }) => {
  const [anchorlEl, setAnchorlEl] = useState(null);
  const history = useHistory();

  const handleMoreOpen = (e) => setAnchorlEl(e.currentTarget);

  const handleMoreClose = () => setAnchorlEl(null);

  const handleEdit = () => {
    handleMoreClose();
    R.equals(obj, "List")
      ? history.push(`/edit-list/${id}`)
      : history.push(`/edit-tag/${id}`);
  };

  const handleDelete = () => {
    handleMoreClose();
    R.equals(obj, "List")
      ? history.push(`/delete-list/${id}`)
      : history.push(`/delete-tag/${id}`);
  };

  return (
    <div>
      <IconButton onClick={handleMoreOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorlEl}
        keepMounted
        open={Boolean(anchorlEl)}
        onClose={handleMoreClose}
      >
        <MenuItem onClick={handleEdit}>{`Rename ${obj}`}</MenuItem>
        <MenuItem onClick={handleDelete}>{`Delete ${obj}`}</MenuItem>
      </Menu>
    </div>
  );
};

export default MoreMenu;
