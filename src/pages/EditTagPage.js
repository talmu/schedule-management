import { TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTag } from "../data/DBHooks";
import BasicToolbar from "../components/BasicToolbar";
import { useEffect, useState } from "react";

const EditTagPage = () => {
  const classes = useStyles();

  const [tagName, setTagName] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();
  const { tagId } = useParams();
  const tag = useTag(tagId);

  useEffect(() => {
    if (tag) setTagName(tag.text);
  }, [tag]);

  const redirectToTags = () => history.push(`/tag/${tagId}`);

  const handleSave = async () => {
    if (tagName) {
      await tag.atomicPatch({ text: tagName });
      redirectToTags();
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
        helperText={error ? "List Name Can't be empty." : ""}
        fullWidth
        value={tagName}
        onChange={handleChange}
        error={error}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <BasicToolbar handleOk={handleSave} redirect={redirectToTags} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}));

export default EditTagPage;
