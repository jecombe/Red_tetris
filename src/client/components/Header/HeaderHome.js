import React from 'react';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
import RedIconButton from '../Common/RedIconButton';

const HeaderHome = (props) => {
  const { handleOnClick } = props;

  return (
    <RedIconButton
      label="Home"
      onClick={handleOnClick}
      icon={HomeIcon}
    />
  );
};

HeaderHome.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default HeaderHome;
