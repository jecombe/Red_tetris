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
  const classes = useStyles();
  const {
    handleSubmit,
    handlePlayerName,
    errPlayerName,
    handlePlayerRoom,
    errPlayerRoom,
    rooms,
    handleRoomSubmit,
  } = props;

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

LoginLayout.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePlayerName: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  errPlayerName: PropTypes.bool,
  handlePlayerRoom: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  errPlayerRoom: PropTypes.bool,
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleRoomSubmit: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default LoginLayout;
