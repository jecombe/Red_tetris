import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import HeaderHome from '../../components/Header/HeaderHome';

const HeaderHomeConnect = (props) => {
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
    <HeaderHome handleOnClick={handleHomeButton} />
  );
};

HeaderHomeConnect.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(HeaderHomeConnect);
