import { useSelector, useDispatch } from "react-redux";
import React, { useState, useCallback, useEffect } from "react";
import ItemDialog from "./ItemDialog";

const EditMode = (props) => {
  return (
    <ItemDialog
      open={props.open}
      setOpen={props.setOpen}
      task={props.task}
    ></ItemDialog>
  );
};

export default EditMode;
