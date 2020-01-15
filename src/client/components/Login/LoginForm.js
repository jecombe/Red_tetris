import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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

  const roomValue = (refPlayerRoom.value ? refPlayerRoom.value : ' ');

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form}>
          <FormControl className={classes.form}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Enter a username
            </InputLabel>
            <TextField
              autoFocus
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              name="username"
              inputRef={refPlayerName}
            />
          </FormControl>

          <FormControl className={classes.form}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Enter a room
            </InputLabel>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="room"
              name="room"
              inputRef={refPlayerRoom}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Join
          </Button>
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
