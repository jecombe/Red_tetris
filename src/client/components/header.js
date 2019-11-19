import React from 'react';
import logo from '../img/header3.png';


const Header = () => {
  return (
    <div style={headerStyle}>
        <img style={headerLogoStyle} src={logo} alt="Logo" />
    </div>
  );
};

const headerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: '0.5%',
    width: '100%'
}

const headerLogoStyle = {
    width: '40%'
}

export default Header;