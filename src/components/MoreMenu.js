import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import DeleteList from "../features/Lists/DeleteList";
import EditList from "../features/Lists/EditList";
import { useList } from "../data/DBHooks";
import Loading from "./Loading";

const MoreMenu = ({ listId }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [anchorlEl, setAnchorlEl] = useState(null);
  const [list, isFetching] = useList(listId);

  const openDeleteDialog = () => setOpenDelete(!openDelete);
  const openEditDialog = () => setOpenEdit(!openEdit);

  const handleMoreOpen = (e) => setAnchorlEl(e.currentTarget);

  const handleMoreClose = () => setAnchorlEl(null);

  const handleEdit = () => {
    openEditDialog();
    handleMoreClose();
  };

  const handleDelete = () => {
    openDeleteDialog();
    handleMoreClose();
  };

  return !isFetching ? (
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
        <MenuItem onClick={handleEdit}>Rename List</MenuItem>
        <MenuItem onClick={handleDelete}>Delete List</MenuItem>
      </Menu>
      <EditList open={openEdit} setOpen={openEditDialog} listObj={list} />
      <DeleteList
        open={openDelete}
        setOpen={openDeleteDialog}
        listId={listId}
        listObj={list}
      />
    </div>
  ) : (
    <Loading />
  );
};

export default MoreMenu;
