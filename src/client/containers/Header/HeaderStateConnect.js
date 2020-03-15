import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderState from '../../components/Header/HeaderState';

const HeaderStateConnect = (props) => {
  const {
    connected,
  } = props;

  return (
    <HeaderState
      connected={connected}
    />
  );
};

HeaderStateConnect.propTypes = {
  connected: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  connected: state.app.connected,
});

export default connect(mapStateToProps)(HeaderStateConnect);
