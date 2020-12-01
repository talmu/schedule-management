import { TextField, FormControl, Grid } from "@material-ui/core";
import { FormLabel } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { useSelector } from "react-redux";

function AddTags(props) {
  const currentTags = useSelector((state) => state.tags);

  const handleOnChange = (event, value, inputValue) => {
    const arr = [...value];
    if (arr[arr.length - 1].inputValue) {
      arr[arr.length - 1] = { title: arr[arr.length - 1].inputValue };
    }
    props.setTags(arr);
  };

  const filter = createFilterOptions();

  return (
    <FormControl name="tags" component="fieldset" ref={props.register}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormLabel name="tags-label" component="legend">
            Tags
          </FormLabel>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tagsCombobox"
            onChange={handleOnChange}
            selectOnFocus
            handleHomeEndKeys
            clearOnBlur
            options={currentTags}
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
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default AddTags;
