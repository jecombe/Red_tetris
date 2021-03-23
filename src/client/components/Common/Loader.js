import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => (
  <Grid container direction="row" justify="center" alignItems="center">
    <Grid item color="primary">
      <CircularProgress />
    </Grid>
  </Grid>
);

export default Loader;
