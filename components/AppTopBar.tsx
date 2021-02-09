import { useDeno } from "aleph";
import React from "react";
// import Logo from '../components/logo.tsx'
// import useCounter from '../lib/useCounter.ts'
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
import { Menu as MenuIcon } from "https://esm.sh/@material-ui/icons@4.11.2";

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

  // TODO Built by Aleph.js in Deno {version}

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
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
