import { useSelector } from "react-redux";
import { Chip, Box } from "@material-ui/core";

function ItemTags(props) {
  const itemsData = useSelector(
    (state) => state.todos[state.selectedIndex].data
  );

  return (
    <div style={{ width: "95%" }}>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-start">
        {itemsData[props.index].tags.map((tag) => {
          return (
            <Box ml={1}>
              <Chip
                key={props.index + "-" + tag.title}
                size="small"
                label={tag.title}
                color="secondary"
              />
            </Box>
          );
        })}
      </Box>
    </div>
  );
}

export default ItemTags;
