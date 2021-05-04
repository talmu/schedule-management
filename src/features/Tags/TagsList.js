import { List } from "@material-ui/core";
import TagItem from "./TagItem";
import { AccordionSummary, AccordionDetails } from "@material-ui/core";
import { Typography, Accordion } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useState } from "react";
import AddTag from "./AddTag";
const TagsList = ({ close, tags }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Accordion
      expanded={expanded}
      onChange={(e, isExpanded) => setExpanded(isExpanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="tags-content"
        id="tags-header"
      >
        <Typography color="textSecondary">Tags</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {tags.map((tag) => {
            return <TagItem key={tag.id} close={close} tag={tag} />;
          })}
          <AddTag close={close} />
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default TagsList;
