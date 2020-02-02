import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const GameButton = (props) => {
  const { handleSubmit, buttonDisabled } = props;

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="medium"
        endIcon={<ArrowForwardIcon />}
        onClick={handleSubmit}
        disabled={buttonDisabled}
      >
          Start Game
      </Button>
    </Grid>
  );
};

GameButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
};

export default GameButton;
