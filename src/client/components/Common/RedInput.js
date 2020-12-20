import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
    border: '1px solid red',
  },
}));

const RedInput = (props) => {
  const {
    label,
    name,
    disabled,
    err,
    value,
    onChange,
  } = props;
  const classes = useStyles();

  return (
    <FormControl className={classes.form}>
      <TextField
        id={name}
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={err}
      />
    </FormControl>
  );
};

RedInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  err: PropTypes.bool,
};

export default RedInput;
