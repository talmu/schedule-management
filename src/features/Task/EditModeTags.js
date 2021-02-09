import { TextField, Grid, InputLabel } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useRxData } from "rxdb-hooks";
import { useParams } from "react-router-dom";
import * as R from "ramda";
import { v4 as uuidv4 } from "uuid";

const EditModeTags = () => {
  const filter = createFilterOptions();
  const classes = useStyles();
  const { taskId } = useParams();

  const { result: tags } = useRxData("tags", (collection) => collection.find());
  const { result: task_tags } = useRxData("task_tags", (collection) =>
    collection.find().where("task_id").equals(taskId)
  );

  const tagsText = task_tags.map(async (task_tag) => {
    const response = await task_tag.tag_id_;
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
  });

  const handleChange = (newValue) => async () => {
    const tag_id = uuidv4();
    await task_tags.atomicUpsert({ task_id: taskId, tag_id: tag_id });
    await tags.atomicUpsert({ id: tag_id, text: newValue[0].inputValue });
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.marginBottom}>
        <InputLabel>Tags</InputLabel>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="tagsCombobox"
          multiple
          onChange={(e, newValue) => handleChange(newValue)}
          defaultValue={task_tags}
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
            console.log(params);
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
