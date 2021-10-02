import { Typography, CardContent, List, ListItem } from "@material-ui/core";
import { Divider, ListItemSecondaryAction, Card } from "@material-ui/core";
import { IconButton, ListItemText } from "@material-ui/core";
import { CancelOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const FilterValues = ({
  filters,
  setFilters,
  options,
  setOptions,
  setField,
}) => {
  const classes = useStyles();
  const handleDelete = (filter) => {
    const field = filter.option;
    setField(field);
    const newOptions = [...options, field];
    setOptions(newOptions);

    const newFilters = [...filters];
    newFilters.splice(filters.indexOf(filter), 1);
    setFilters(newFilters);
  };

  return filters.length === 0 ? null : (
    <Card className={classes.margin}>
      <CardContent style={{ backgroundColor: "whitesmoke" }}>
        <Typography variant="subtitle1">Filters</Typography>
        <List>
          <Divider />
          {filters.map((filter) => (
            <div key={filter.option}>
              <ListItem dense>
                <ListItemText
                  primary={`${filter.option} ${filter.operator} ${filter.value}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleDelete(filter)}
                  >
                    <CancelOutlined />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
}));
export default FilterValues;
