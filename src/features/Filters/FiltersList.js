import { List } from "@material-ui/core";
import { AccordionSummary, AccordionDetails } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Typography, Accordion } from "@material-ui/core";
import { useState } from "react";
import AddFilter from "./AddFilter";
import PriorityFilter from "./PriorityFilter";
import StatusFilter from "./StatusFilter";

const FiltersList = ({ close }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Accordion
      expanded={expanded}
      onChange={(e, isExpanded) => setExpanded(isExpanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="filters-content"
        id="filters-header"
      >
        <Typography color="textSecondary">Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <PriorityFilter close={close} />
          <StatusFilter close={close} />
          <AddFilter close={close} />
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default FiltersList;
