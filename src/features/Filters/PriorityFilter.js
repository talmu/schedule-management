import { usePriorities } from "../../data/DBHooks";
import { useState } from "react";
import { ExpandMore } from "@material-ui/icons";
import { AccordionSummary, AccordionDetails } from "@material-ui/core";
import { Typography, Accordion } from "@material-ui/core";
import Loading from "../../components/Loading";
import { ListItemText, List, ListItem } from "@material-ui/core";
import { useHistory } from "react-router";

const PriorityFilter = ({ close }) => {
  const [priority, isFetching] = usePriorities();
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const handleClick = (p) => {
    const selector = { priority_id: p.id };
    history.push({
      pathname: `/filter/${p.text} Priority`,
      state: selector,
    });
    close();
  };

  return isFetching ? (
    <Loading />
  ) : (
    <Accordion
      expanded={expanded}
      onChange={(e, isExpanded) => setExpanded(isExpanded)}
      style={{ boxShadow: "none" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="filters-content"
        id="filters-header"
      >
        <Typography color="textSecondary">Priority</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {priority.map((p) => (
            <ListItem button key={p.id} onClick={() => handleClick(p)}>
              <ListItemText primary={p.text} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default PriorityFilter;
