import { TextField, Grid, InputLabel } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

const Tags = (props) => {
  const filter = createFilterOptions();
  const tags = props.tags;
  const defaultTags = props.defaultTags;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <InputLabel>Tags</InputLabel>
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="tags"
          control={props.control}
          render={(props) => (
            <Autocomplete
              multiple
              id="tagsCombobox"
              defaultValue={defaultTags}
              onChange={(e, value) => props.onChange(value)}
              selectOnFocus
              handleHomeEndKeys
              clearOnBlur
              value={props.value}
              options={tags}
              renderOption={(option) => option.title}
              getOptionLabel={(option) =>
                option.inputValue ? option.inputValue : option.title
              }
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    title: `Create "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              style={{ width: 310 }}
              filterSelectedOptions
              freeSolo
              renderInput={(params) => (
                <TextField
                  key="tag"
                  {...params}
                  label="Select Tags"
                  variant="outlined"
                />
              )}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Tags;
