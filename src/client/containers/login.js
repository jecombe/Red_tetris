import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from '../components/Login/LoginForm';
import LoginRooms from '../components/Login/LoginRooms';

const useStyles = makeStyles((theme) => ({
  rootLogin: {
    padding: theme.spacing(3, 3),
  },
}));

const Login = () => {
  const classes = useStyles();
  const refPlayerName = React.createRef();
  const refPlayerRoom = React.createRef();

  const handleOnClickRoom = (e) => {
    refPlayerRoom.current.value = e;
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Card className={classes.rootLogin}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <LoginForm
              refPlayerName={refPlayerName}
              refPlayerRoom={refPlayerRoom}
            />
          </Grid>
          <Grid item xs={12}>
            <LoginRooms onClickRoom={handleOnClickRoom} />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Login;
