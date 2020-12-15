import { useSelector } from "react-redux";
import { Chip, Box } from "@material-ui/core";

const ItemTags = (props) => {
  const tags = useSelector(
    (state) => state.todos[state.selectedIndex].data[props.index].tags
  );

  return (
    <div style={{ width: "95%" }}>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-start">
        {tags.map((tag) => {
          const key = `${props.index}-${tag.title}`;
          return (
            <Box ml={1} key={key}>
              <Chip size="small" label={tag.title} color="secondary" />
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default ItemTags;
