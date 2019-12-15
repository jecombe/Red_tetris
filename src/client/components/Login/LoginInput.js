import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formHelper: {
    color: 'red',
  },
}));

const LoginInput = (props) => {
  const {
    title,
    label,
    refHandle,
    err,
  } = props;
  const classes = useStyles();

  return (
    <div>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <div className={classes.form}>
        <TextField
          error={err}
          fullWidth
          id={label}
          label={label}
          name={label}
          inputRef={refHandle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                { '>' }
              </InputAdornment>
            ),
          }}
        />
        {err && (
          <FormHelperText className={classes.formHelper}>
            Error with input field
          </FormHelperText>
        )}
      </div>
    </div>
  );
};

LoginInput.defaultProps = {
  err: false,
};

LoginInput.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  refHandle: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  err: PropTypes.bool,
};

export default LoginInput;
