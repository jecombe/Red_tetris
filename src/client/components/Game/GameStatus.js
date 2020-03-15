import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from '../../../style/style.css';

const useStyles = makeStyles((theme) => ({
  gameBoard: {
    padding: theme.spacing(3, 3),
    margin: theme.spacing(3, 3),
  },
}));

const GameStatus = ({ handleSubmit }) => (
  <button type="submit" onClick={handleSubmit} className={AwesomeButtonStyles.box}>
      START
  </button>
);

GameStatus.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default GameStatus;
