import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LaunchIcon from '@material-ui/icons/Launch';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const LoginGamesMap = (games, onClickRoom) => {
  if (Object.entries(games).length === 0
      && games.constructor === Object) {
    return (
      <Grid container item justify="center">
        No rooms available
      </Grid>
    );
  }

  return Object.keys(games).map((key) => (
    <ListItem
      button
      value={key}
      key={key}
      onClick={() => onClickRoom(key)}
    >
      <ListItemText primary={`${games[key].roomName}`} secondary={`Owned by ${games[key].owner}`} />
      <ListItemText primary="Game not started." />
      <LaunchIcon color="primary" />
    </ListItem>
  ));
};

const LoginRooms = (props) => {
  const { games, onClickRoom } = props;

  return (
    <Grid container justify="center" alignItems="center" spacing="10">
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Available rooms"
          />
          <CardContent>
            <Grid item xs={12} style={{ maxHeight: 350, overflow: 'auto' }}>
              <List style={{ maxHeight: '100%' }}>
                {LoginGamesMap(games, onClickRoom)}
              </List>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

LoginRooms.propTypes = {
  games: PropTypes.object.isRequired,
  onClickRoom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  games: state.app.games,
});

export default connect(mapStateToProps, null)(LoginRooms);
