import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import LoginForm from '../../components/Login/LoginForm';
import LoginRooms from '../../components/Login/LoginRooms';

import actions from '../../actions';

const LoginConnect = (props) => {
  const {
    reqLogin,
    history,
  } = props;

  const refPlayerName = React.createRef();
  const refPlayerRoom = React.createRef();

  const [errPlayerName, setErrPlayerName] = useState(false);
  const [errPlayerRoom, setErrPlayerRoom] = useState(false);

  const handleOnClickRoom = (e) => {
    refPlayerRoom.current.value = e;
  };

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
    <Container component="main" maxWidth="sm">
      <LoginForm
        refPlayerName={refPlayerName}
        errPlayerName={errPlayerName}
        refPlayerRoom={refPlayerRoom}
        errPlayerRoom={errPlayerRoom}
        handleSubmit={handleSubmit}
      />
      <LoginRooms onClickRoom={handleOnClickRoom} />
    </Container>
  );
};

LoginConnect.propTypes = {
  reqLogin: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapDispatchToProps = {
  reqLogin: actions.reqLogin,
};

export default withRouter(connect(null, mapDispatchToProps)(LoginConnect));
