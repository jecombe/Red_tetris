import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LoginInput from './LoginInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const LoginForm = (props) => {
  const {
    handlePlayerName,
    errPlayerName,
    handlePlayerRoom,
    errPlayerRoom,
  } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={1} className={classes.paper}>
      <Grid item xs={12} sm={6}>
        <LoginInput
          title="Enter a username"
          label="name"
          refHandle={handlePlayerName}
          err={errPlayerName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LoginInput
          title="Enter a room"
          label="room"
          refHandle={handlePlayerRoom}
          err={errPlayerRoom}
        />
      </Grid>
    </Grid>
  );
};

LoginForm.defaultProps = {
  errPlayerName: false,
  errPlayerRoom: false,
};

LoginForm.propTypes = {
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
};

export default LoginForm;
