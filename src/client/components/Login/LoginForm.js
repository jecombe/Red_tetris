import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import LoginInput from './LoginInput';
import LoginButton from './LoginButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const LoginForm = (props) => {
  const {
    reqLogin,
    history,
    refPlayerName,
    refPlayerRoom,
  } = props;
  const classes = useStyles();

  const [errPlayerName, setErrPlayerName] = useState(false);
  const [errPlayerRoom, setErrPlayerRoom] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // event.persist();
    const name = refPlayerName.current.value.trim();
    const room = refPlayerRoom.current.value.trim();

    if (!name) setErrPlayerName(true); else setErrPlayerName(false);
    if (!room) setErrPlayerRoom(true); else setErrPlayerRoom(false);

    if (!name || !room) return;

    reqLogin({
      playerName: name,
      playerRoom: room,
    });

    history.push(`/#${room}[${name}]`);
  };

  return (
    <Grid container direction="row" spacing={1} className={classes.paper}>
      <Grid item xs={12} sm={6}>
        <LoginInput
          title="Enter a username"
          refHandle={refPlayerName}
          err={errPlayerName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LoginInput
          title="Enter a room"
          refHandle={refPlayerRoom}
          err={errPlayerRoom}
        />
      </Grid>
      <Grid item xs={12}>
        <LoginButton handleSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
};

const refPropTypes = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
]);

LoginForm.propTypes = {
  reqLogin: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  refPlayerName: refPropTypes.isRequired,
  refPlayerRoom: refPropTypes.isRequired,
};

const mapDispatchToProps = {
  reqLogin: actions.reqLogin,
};

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));
