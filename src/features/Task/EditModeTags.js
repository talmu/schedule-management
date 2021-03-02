import { TextField, Grid, InputLabel } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useTaskTags } from "../../data/DBHooks";
import Loading from "../../components/Loading";
import { useRxCollection } from "rxdb-hooks";

const EditModeTags = ({ tags }) => {
  const filter = createFilterOptions();
  const classes = useStyles();
  const { taskId } = useParams();
  const [tagsText, setTags] = useState([]);
  const [task_tags, isFetching] = useTaskTags(taskId);

  const tagsCollection = useRxCollection("tags");
  const taskTagsCollection = useRxCollection("task_tags");

  useEffect(() => {
    Promise.all(task_tags.map(async (task_tag) => await task_tag.tag_id_)).then(
      setTags
    );
  }, [task_tags]);

  const handleChange = async (newArray, reason) => {
    console.log(newArray);
    console.log(reason);
    if (reason === "select-option") {
      const newValue = newArray[newArray.length - 1];
      console.log(newValue);
      let tag_id;
      if (newValue.inputValue) {
        tag_id = uuidv4();
        await tagsCollection.atomicUpsert({
          id: tag_id,
          text: newValue.inputValue,
        });
      } else tag_id = newValue.id;

      await taskTagsCollection.atomicUpsert({
        id: uuidv4(),
        task_id: taskId,
        tag_id: tag_id,
      });
    }
    if (reason === "remove-option") {
      const toBeRemove = task_tags.filter(
        (tag) => newArray.indexOf(tag) === -1
      );

      console.log(toBeRemove);
      await toBeRemove[0].remove();
    }
  };

  return isFetching ? (
    <Loading />
  ) : (
    <Grid container>
      <Grid item xs={12} className={classes.marginBottom}>
        <InputLabel>Tags</InputLabel>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="tagsCombobox"
          multiple
          onChange={(e, newArray, reason) => handleChange(newArray, reason)}
          selectOnFocus
          handleHomeEndKeys
          clearOnBlur
          value={tagsText}
          options={tags}
          renderOption={(option) => option.text}
          getOptionLabel={(option) => {
            if (typeof option === "string") return option;
            if (option.inputValue) return option.inputValue;
            return option.text;
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            // Suggest the creation of a new value
            if (params.inputValue !== "" && filtered.length === 0) {
              const isExist = tagsText.filter(
                (tag) => tag.text === params.inputValue
              );

              if (isExist.length === 0) {
                filtered.push({
                  inputValue: params.inputValue,
                  text: `Create "${params.inputValue}"`,
                });
              }
            }

            return filtered;
          }}
          filterSelectedOptions
          freeSolo
          renderInput={(params) => {
            return (
              <TextField
                key="tag"
                {...params}
                label="Select Tags"
                variant="outlined"
                fullWidth
              />
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
}));

export default EditModeTags;
