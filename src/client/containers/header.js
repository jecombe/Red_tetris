import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderLayout from '../components/Header/HeaderLayout';
import { appStatePropTypes } from '../reducers/app';

const Header = (props) => {
  const {
    app,
    history,
  } = props;

  const handleHomeButton = (e) => {
    e.preventDefault(); // event.persist();
    // Need to dispatch action for disconnect user
    if (history) {
      history.push('/');
    }
  };

  return (
    <HeaderLayout
      app={app}
      handleHomeButton={handleHomeButton}
    />
  );
};

Header.propTypes = {
  app: appStatePropTypes.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  app: state.app,
});

export default withRouter(connect(mapStateToProps)(Header));
