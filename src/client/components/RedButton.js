import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RedButton = (props) => {
  const {
    name,
    handleSubmit,
    disabled,
  } = props;
  const classes = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={handleSubmit}
      disabled={disabled}
    >
      {name}
    </Button>
  );
};

RedButton.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default RedButton;
