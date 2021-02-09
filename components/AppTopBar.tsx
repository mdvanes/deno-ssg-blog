import { useDeno } from "aleph";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "https://esm.sh/@material-ui/core@4.11.3";
import AppDrawer from "./AppDrawer.tsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function AppTopBar() {
  const version = useDeno(() => Deno.version.deno);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <AppDrawer />
          <Typography variant="h6" className={classes.title}>
            Codestar [Aleph]
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/publications">Publications</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
