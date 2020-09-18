import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  RedIconButton: {
    color: 'grey',
    '&:hover': {
      color: 'red',
    },
  },
});

const RedIconButton = (props) => {
  const {
    label,
    onClick,
    icon,
  } = props;
  const classes = useStyles();

  const Icon = icon;

  return (
    <IconButton
      aria-label={label}
      component="span"
      onClick={onClick}
      className={classes.RedIconButton}
    >
      <Icon />
    </IconButton>
  );
};

RedIconButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RedIconButton;
