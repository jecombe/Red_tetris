import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Header from './header';
import Main from './main';
import Footer from './footer';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100vw',
    padding: theme.spacing(1),
  },
  header: {
    minHeight: '3vh',
    width: '100vw',
    padding: theme.spacing(1),
  },
  main: {
    minHeight: '84vh',
    width: '100vw',
    padding: theme.spacing(1),
  },
  footer: {
    minHeight: '2vh',
    width: '100vw',
    padding: theme.spacing(1),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid container className={classes.header}>
        <Header />
      </Grid>
      <Grid container className={classes.main}>
        <Main />
      </Grid>
      <Grid container className={classes.footer}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default App;
