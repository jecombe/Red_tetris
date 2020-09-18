import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import RedButton from '../Common/RedButton';

const GameSettings = (props) => {
  const {
    playerName,
    playerOwner,
    handleStart,
  } = props;

  const isOwner = (playerOwner === false ? ' not ' : ' ');

  return (
    <Card>
      <CardHeader
        title={playerName}
        subheader={`You are${isOwner}the owner`}
      />
      <Divider light />
      <CardContent>
        <Grid container>
          <Grid container>
            <Grid item xs={6}>
              Rank
            </Grid>
            <Grid item xs={6}>
              0
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              Mallus
            </Grid>
            <Grid item xs={6}>
              0
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              Rank
            </Grid>
            <Grid item xs={6}>
              0
            </Grid>
          </Grid>
        </Grid>
        <CardActions>
          <RedButton
            name="Start Game"
            handleSubmit={handleStart}
            disabled={!playerOwner}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
};

GameSettings.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerOwner: PropTypes.bool.isRequired,
  handleStart: PropTypes.func.isRequired,
};

export default GameSettings;
