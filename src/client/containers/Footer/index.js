import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import FooterAuthors from '../../components/Footer/FooterAuthors';

const useStyles = makeStyles((theme) => ({
  rootFooter: {
    padding: theme.spacing(1),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div>
      <Divider />
      <Grid container justify="center" alignItems="center" className={classes.rootFooter}>
        <FooterAuthors />
      </Grid>
    </div>
  );
};

export default Footer;
