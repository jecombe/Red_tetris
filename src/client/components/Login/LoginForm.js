import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import RedInput from '../Common/RedInput';
import RedIconButton from '../Common/RedIconButton';

const LoginForm = (props) => {
  const {
    refPlayerName,
    errPlayerName,
    refPlayerRoom,
    errPlayerRoom,
    handleSubmit,
  } = props;

  return (
    <Grid container justify="center" alignItems="center" spacing="2">
      <Grid item xs={5}>
        <RedInput
          label="username"
          name="username"
          defaultValue=""
          disabled={false}
          refHandle={refPlayerName}
          err={errPlayerName}
        />
      </Grid>
      <Grid item xs={5}>
        <RedInput
          label="room"
          name="room"
          defaultValue=""
          disabled={false}
          refHandle={refPlayerRoom}
          err={errPlayerRoom}
        />
      </Grid>
      <Grid item xs={2}>
        <RedIconButton
          label="Join"
          onClick={handleSubmit}
          icon={ArrowForwardIcon}
        />
      </Grid>
    </Grid>
  );
};

const refPropTypes = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
]);

LoginForm.propTypes = {
  refPlayerName: refPropTypes.isRequired,
  errPlayerName: PropTypes.bool.isRequired,
  refPlayerRoom: refPropTypes.isRequired,
  errPlayerRoom: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
