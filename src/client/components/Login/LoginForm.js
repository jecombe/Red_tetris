import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import RedInput from '../RedInput';
import RedButton from '../RedButton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = (props) => {
  const { refPlayerName, refPlayerRoom, handleSubmit } = props;
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form}>
          <RedInput
            label="Enter a username"
            name="Player Name"
            defaultValue=""
            disabled={false}
            refHandle={refPlayerName}
          />
          <RedInput
            label="Enter a room"
            name="Player Room"
            defaultValue=""
            disabled={false}
            refHandle={refPlayerRoom}
          />
          <RedButton
            name="Join"
            handleSubmit={handleSubmit}
            disabled={false}
          />
        </form>
      </div>
    </Container>
  );
};

LoginForm.propTypes = {
  refPlayerName: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  refPlayerRoom: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};


export default LoginForm;
