function DialogFooterBar(props) {
  return (
    <div className="d-flex justify-content-end mt-3">
      <input
        name="cancel"
        type="button"
        value="Cancel"
        onClick={props.handleClose}
        className="btn btn-primary text-white"
      ></input>
      <input
        name="submit"
        type="submit"
        value="Add"
        className="btn btn-primary text-white ml-2"
      ></input>
    </div>
  );
}

export default DialogFooterBar;
