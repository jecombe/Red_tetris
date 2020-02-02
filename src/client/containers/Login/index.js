import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import actions from '../../actions';
import LoginForm from '../../components/Login/LoginForm';
import LoginRooms from '../../components/Login/LoginRooms';

const useStyles = makeStyles((theme) => ({
  rootLogin: {
    padding: theme.spacing(3, 3),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Login = (props) => {
  const { history, reqLogin } = props;
  const classes = useStyles();
  const refPlayerName = React.createRef();
  const refPlayerRoom = React.createRef();

  console.log(history);

  const [errPlayerName, setErrPlayerName] = useState(false);
  const [errPlayerRoom, setErrPlayerRoom] = useState(false);

  const handleSubmitRoom = (e) => {
    refPlayerRoom.current.value = e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = refPlayerName.current.value.trim();
    const room = refPlayerRoom.current.value.trim();
    console.log(name, room);

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
    <Container component="main" maxWidth="md">
      <Card className={classes.rootLogin}>
        <Grid container justify="center" alignItems="center">
          <Grid container justify="center">
            <Grid item xs={6}>
              <LoginForm
                refPlayerName={refPlayerName}
                refPlayerRoom={refPlayerRoom}
                handleSubmit={handleSubmit}
              />
            </Grid>
            <Grid item xs={6}>
              <LoginRooms
                handleSubmitRoom={handleSubmitRoom}
                refPlayerName={refPlayerName}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  reqLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  reqLogin: actions.app.reqLogin,
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
