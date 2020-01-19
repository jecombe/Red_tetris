import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderState from '../../components/Header/HeaderState';

const HeaderStateConnect = (props) => {
  const {
    connected,
    host,
    port,
  } = props;

  return (
    <HeaderState
      connected={connected}
      host={host}
      port={port}
    />
  );
};

HeaderStateConnect.propTypes = {
  connected: PropTypes.bool.isRequired,
  host: PropTypes.string.isRequired,
  port: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  connected: state.app.connected,
  host: state.app.host,
  port: state.app.port,
});

export default connect(mapStateToProps)(HeaderStateConnect);
