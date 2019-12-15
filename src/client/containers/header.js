import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderLayout from '../components/Header/HeaderLayout';

const Header = (props) => {
  const {
    connected,
    history,
  } = props;

  const handleHomeButton = (e) => {
    e.preventDefault(); // event.persist();
    // Need to dispatch action for disconnect user
    if (history) history.push('/');
  };

  return (
    <HeaderLayout
      connected={connected}
      handleHomeButton={handleHomeButton}
    />
  );
};

Header.propTypes = {
  connected: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  connected: state.app.connected,
});

export default withRouter(connect(mapStateToProps)(Header));
