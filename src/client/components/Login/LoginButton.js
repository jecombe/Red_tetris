import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const LoginButton = (props) => {
  const { handleSubmit } = props;

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="medium"
        endIcon={<ArrowForwardIcon />}
        onClick={handleSubmit}
      >
          Join
      </Button>
    </Grid>
  );
};

LoginButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginButton;
