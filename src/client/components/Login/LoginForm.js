import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
    handlePlayerRoom,
  } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={1} className={classes.paper}>
      <Grid item xs={12} sm={6}>
        <Typography component="h1" variant="h5">
            Enter a username
        </Typography>
        <div className={classes.form}>
          <TextField
            margin="dense"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            inputRef={handlePlayerName}
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography component="h1" variant="h5">
            Enter a room
        </Typography>
        <div className={classes.form}>
          <TextField
            margin="dense"
            required
            fullWidth
            id="room"
            label="Room"
            name="room"
            autoFocus
            inputRef={handlePlayerRoom}
          />
        </div>
      </Grid>
    </Grid>
  );
};

LoginForm.propTypes = {
  handlePlayerName: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  handlePlayerRoom: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default LoginForm;
