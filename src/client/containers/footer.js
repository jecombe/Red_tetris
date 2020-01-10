import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import FooterAuthors from '../components/Footer/FooterAuthors';

const useStyles = makeStyles((theme) => ({
  rootFooter: {
    padding: theme.spacing(1),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" className={classes.rootFooter}>
      <FooterAuthors />
    </Grid>
  );
};

export default Footer;
