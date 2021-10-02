import { useStatus } from "../../data/DBHooks";
import { useState } from "react";
import { ExpandMore } from "@material-ui/icons";
import { AccordionSummary, AccordionDetails } from "@material-ui/core";
import { Typography, Accordion } from "@material-ui/core";
import Loading from "../../components/Loading";
import { ListItemText, List, ListItem } from "@material-ui/core";
import { useHistory } from "react-router";

const StatusFilter = ({ close }) => {
  const [status, isFetching] = useStatus();
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const handleClick = (s) => {
    const selector = { status_id: s.id };
    history.push({
      pathname: `/filter/${s.text} Status`,
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
      className="accordion"
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="filters-content"
        id="filters-header"
      >
        <Typography color="textSecondary">Status</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {status.map((s) => (
            <ListItem button key={s.id} onClick={() => handleClick(s)}>
              <ListItemText primary={s.text} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default StatusFilter;
