import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LaunchIcon from '@material-ui/icons/Launch';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const LoginRoomsMap = (rooms, handleRoomSubmit) => {
  if (rooms.length === 0) {
    return (
      <div>
        No rooms available
      </div>
    );
  }
  return rooms.map((i) => (
    <ListItem
      button
      value={i.roomName}
      key={i.roomName}
      onClick={() => handleRoomSubmit(i.roomName)}
    >
      <ListItemText primary={`${i.roomName}`} secondary={`Owned by ${i.owner}`} />
      <ListItemText primary="Game not started." />
      <LaunchIcon color="primary" />
    </ListItem>
  ));
};

const LoginRooms = (props) => {
  const { rooms, handleRoomSubmit } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" className={classes.paper}>
      <Typography component="h1" variant="h5">
        Available rooms
      </Typography>
      <Grid item xs={12} style={{ maxHeight: 150, overflow: 'auto' }}>
        <List style={{ maxHeight: '100%' }}>
          {LoginRoomsMap(rooms, handleRoomSubmit)}
        </List>
      </Grid>
    </Grid>
  );
};

LoginRooms.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleRoomSubmit: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default LoginRooms;
