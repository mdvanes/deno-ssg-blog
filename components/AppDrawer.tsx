import { useDeno } from "aleph";
import React from "react";
import {
  Drawer,
  Button,
  Anchor,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@material-ui/core";
import {
  Home as HomeIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);
  const version = useDeno(() => Deno.version.deno);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button href="/">
          <ListItemIcon>
            <HomeIcon />{" "}
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button href="/publications">
          <ListItemText primary="Publications" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary={`Built by Aleph.js in Deno ${version}`} />
        </ListItem>
      </List>
    </div>
  );

  const anchor = "left";

  return (
    <div>
      <Drawer anchor={anchor} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
}
