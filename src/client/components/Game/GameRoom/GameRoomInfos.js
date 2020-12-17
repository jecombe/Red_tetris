import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LaunchIcon from '@material-ui/icons/Launch';
import Card from '@material-ui/core/Card';

import { playerStateProp, settingsProp, roomStateProp } from '../../../reducers/reducers.types';

import BoxInfo from '../../Common/BoxInfo';
import RedButton from '../../Common/RedButton';

const useStyles = makeStyles((theme) => ({
  box: {
    height: '100%',
  },
  grid: {
    height: '100%',
  },
}));

const GameRoomInfos = (props) => {
  const {
    name,
    room,
    owner,
    started,
    handleStart,
  } = props;
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Grid container direction="column" justify="center" spacing={2} className={classes.grid}>
        <Grid item container direction="row" justify="space-evenly">
          <Grid item xs={5}>
            <BoxInfo field="room name" value={room} />
          </Grid>
          <Grid item xs={5}>
            <BoxInfo field="room owner" value={owner} />
          </Grid>
        </Grid>
        <Grid item container justify="center">
          <Grid item xs={10}>
            <RedButton
              name="start game"
              handleSubmit={handleStart}
              disabled={!((name === owner && !started))}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

GameRoomInfos.propTypes = {
  name: playerStateProp.name.isRequired,
  room: roomStateProp.room.isRequired,
  owner: settingsProp.owner.isRequired,
  started: settingsProp.started.isRequired,
  handleStart: PropTypes.func.isRequired,
};

export default GameRoomInfos;
