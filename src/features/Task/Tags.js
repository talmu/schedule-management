import { TextField, Grid, InputLabel } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useRxData } from "rxdb-hooks";

const Tags = ({ control, defaultTags }) => {
  const filter = createFilterOptions();
  const classes = useStyles();

  const { result: tags } = useRxData("tags", (collection) => collection.find());

  return (
    <Grid container>
      <Grid item xs={12} className={classes.marginBottom}>
        <InputLabel>Tags</InputLabel>
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="tags"
          control={control}
          defaultValue={defaultTags}
          render={({ onChange, value }) => (
            <Autocomplete
              multiple
              id="tagsCombobox"
              onChange={(e, value) => onChange(value)}
              selectOnFocus
              handleHomeEndKeys
              clearOnBlur
              value={value}
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
                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    text: `Create "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              filterSelectedOptions
              freeSolo
              renderInput={(params) => (
                <TextField
                  key="tag"
                  {...params}
                  label="Select Tags"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          )}
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

export default Tags;
