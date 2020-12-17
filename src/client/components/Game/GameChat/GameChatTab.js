import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { messagePropTypes } from '../../../reducers/reducers.types';
import GameChatBoxContainer from '../../../containers/Game/GameChat/GameChatBoxContainer';
import GameChatMessage from './GameChatMessage';

const GameChatTab = (props) => {
  const {
    index, indexValue, to, messages,
  } = props;

  return (
    <Paper variant="outlined" style={{ height: '100%', width: '100%' }} hidden={index !== indexValue}>
      <Grid container alignItems="center" style={{ height: '100%', width: '100%' }}>
        <Grid item>
          <List style={{ height: '60vh', border: '1px solid blue' }}>
            {index === indexValue && messages.map((message) => (
              <GameChatMessage message={message} />
            ))}
          </List>
          <CardContent>
            <Grid container>
              <Grid item xs>
                <GameChatBoxContainer to={to} />
              </Grid>
            </Grid>
          </CardContent>
        </Grid>

      </Grid>
    </Paper>
  );
};

GameChatTab.propTypes = {
  index: PropTypes.number.isRequired,
  indexValue: PropTypes.number.isRequired,
  to: PropTypes.string.isRequired,
  messages: messagePropTypes.isRequired,
};

export default GameChatTab;
