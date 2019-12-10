import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

import HeaderLayout from '../components/Header/HeaderLayout';

const Header = (props) => {
  const {
    connexion,
    history,
  } = props;

  const handleHomeButton = (e) => {
    e.preventDefault(); // event.persist();
    // Need to dispatch action for disconnect user
    if (history) history.push('/');
  };

  return (
    <HeaderLayout
      connexion={connexion}
      handleHomeButton={handleHomeButton}
    />
  );
};

Header.propTypes = {
  connexion: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  connexion: state.app.connexion,
});

export default withRouter(connect(mapStateToProps)(Header));
