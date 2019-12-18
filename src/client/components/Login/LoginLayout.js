import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from './LoginForm';
import LoginRooms from './LoginRooms';
import LoginButton from './LoginButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 3),
    margin: theme.spacing(3, 3),
  },
}));

const LoginLayout = (props) => {
  const {
    handleSubmit,
    handleRoomSubmit,
    handlePlayerName,
    handlePlayerRoom,
    errPlayerName,
    errPlayerRoom,
    rooms,
    games,
  } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Card className={classes.root}>
        <Grid container direction="row" justify="center">
          <Grid item xs={12}>
            <LoginForm
              handlePlayerName={handlePlayerName}
              errPlayerName={errPlayerName}
              handlePlayerRoom={handlePlayerRoom}
              errPlayerRoom={errPlayerRoom}
            />
          </Grid>
          <Grid item xs={12}>
            <LoginRooms
              rooms={rooms}
              games={games}
              handleRoomSubmit={handleRoomSubmit}
            />
          </Grid>
          <Grid item xs={12}>
            <LoginButton
              handleSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

LoginLayout.defaultProps = {
  errPlayerName: false,
  errPlayerRoom: false,
};

const refPropTypes = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
]);

LoginLayout.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleRoomSubmit: refPropTypes.isRequired,
  handlePlayerName: refPropTypes.isRequired,
  handlePlayerRoom: refPropTypes.isRequired,
  errPlayerRoom: PropTypes.bool,
  errPlayerName: PropTypes.bool,
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  games: PropTypes.object.isRequired,
};

export default LoginLayout;
