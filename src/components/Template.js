import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, CssBaseline, Hidden } from "@material-ui/core";
import Bar from "./AppBar";
import MenuBar from "./MenuBar";

const Template = ({ window, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const openMenu = () => setOpen(true);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Bar openMenu={openMenu} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={open}
            onClose={closeMenu}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <MenuBar close={closeMenu} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open={open}
          >
            <MenuBar close={closeMenu} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
}));

export default Template;
