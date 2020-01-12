/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rootFooter: {
    padding: theme.spacing(1),
  },
}));

const FooterAuthors = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" className={classes.rootFooter}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Made by '}
        <Link color="inherit" href="https://github.com/jecombe">
          jecombe
        </Link>
        {' & '}
        <Link color="inherit" href="https://github.com/dz0nda">
          dzonda
        </Link>
        {' • '}
        {new Date().getFullYear()}
      </Typography>
    </Grid>
  );
};

export default FooterAuthors;
