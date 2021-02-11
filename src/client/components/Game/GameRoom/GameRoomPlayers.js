import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';

import { TABLE_PLAYERS_COLUMNS } from '../../../constants/tables';

import {
  playerStateProp,
  settingsProp,
  playersStatePropTypes,
} from '../../../reducers/reducers.types';

import VirtualizedList from '../../Common/VirtualizedList';
import GameRoomOwner from './GameRoomOwner';

const useStyles = makeStyles({
  box: {
    height: '100%',
  },
  tab: {
    fontWeight: 'bold',
  },
  paper: {
    height: '33vh',
  },
});

const GameRoomPlayers = (props) => {
  const { name, owner, players, handleSetOwner } = props;
  const classes = useStyles();

  const playersList = Object.values(players);

  return (
    <Box className={classes.box}>
      <AppBar position="static" color="default">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab
                disabled
                className={classes.tab}
                label="Players"
                style={{ color: 'red' }}
              />
            </Tabs>
          </Grid>
          <Grid item>
            <GameRoomOwner
              disabled={!(name === owner)}
              owner={owner}
              players={players}
              onClickOwner={handleSetOwner}
            />
          </Grid>
        </Grid>
      </AppBar>
      <Paper variant="outlined" className={classes.paper} elevation={0}>
        <VirtualizedList
          owner={owner}
          rowCount={playersList.length}
          rowGetter={({ index }) => playersList[index]}
          columns={TABLE_PLAYERS_COLUMNS}
        />
      </Paper>
    </Box>
  );
};

GameRoomPlayers.propTypes = {
  name: playerStateProp.name.isRequired,
  owner: settingsProp.owner.isRequired,
  players: playersStatePropTypes.isRequired,
  handleSetOwner: PropTypes.func.isRequired,
};

export default GameRoomPlayers;
