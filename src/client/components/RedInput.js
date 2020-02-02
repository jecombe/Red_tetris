import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const RedInput = (props) => {
  const {
    label,
    name,
    defaultValue,
    disabled,
    refHandle,
  } = props;
  const classes = useStyles();

  return (
    <FormControl className={classes.form}>
      <InputLabel shrink htmlFor="bootstrap-input">
        {label}
      </InputLabel>
      <TextField
        margin="normal"
        fullWidth
        defaultValue={defaultValue}
        id={name}
        name={name}
        disabled={disabled}
        inputRef={refHandle}
      />
    </FormControl>
  );
};

RedInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  refHandle: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default RedInput;
