import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  roomRow: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

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
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" className={classes.roomRow}>
      <Typography component="h1" variant="h5">
        Available rooms
      </Typography>
      <Grid item xs={12} style={{ maxHeight: 250, overflow: 'auto' }}>
        <List style={{ maxHeight: '100%' }}>
          {LoginGamesMap(games, onClickRoom)}
        </List>
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
