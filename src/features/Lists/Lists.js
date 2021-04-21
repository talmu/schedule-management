import { ListItemText, List, ListItem, ListItemIcon } from "@material-ui/core";
import { AccordionSummary, AccordionDetails } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Typography, Accordion } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import AddList from "./AddList";

const Lists = ({ close, lists }) => {
  const { listId } = useParams();
  const history = useHistory();
  const [expanded, setExpanded] = useState(true);

  const handleClick = (list_id) => () => {
    history.push(`/list/${list_id}`);
    close();
  };
  return (
    <Accordion
      expanded={expanded}
      onChange={(e, isExpanded) => setExpanded(isExpanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="lists-content"
        id="lists-header"
      >
        <Typography color="textSecondary">Lists</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {lists.map((list) => (
            <ListItem
              button
              key={list.id}
              selected={list.id === listId}
              onClick={handleClick(list.id)}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={list.name} />
            </ListItem>
          ))}
          <AddList close={close} />
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default Lists;
