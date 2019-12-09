import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gameBoard: {
    padding: theme.spacing(3, 3),
    margin: theme.spacing(3, 3),
  },
}));

const GameBoard = ({ handleSubmit }) => {
  const classes = useStyles();

  return (
    <div className={classes.gameBoard}>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

GameBoard.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default GameBoard;
