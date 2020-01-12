import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import HeaderHomeButton from '../../components/Header/HeaderHomeButton';

const HeaderHome = (props) => {
  const {
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
    <HeaderHomeButton handleOnClick={handleHomeButton} />
  );
};

HeaderHome.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(HeaderHome);
