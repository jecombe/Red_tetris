import React from 'react';
import logo from '../img/header3.png';


const HeaderLogo = () => {
  return (
    <div style={headerLogoStyle}>
        <img style={headerLogoImgStyle} src={logo} alt="Logo" />
    </div>
  );
};

const headerLogoStyle = {
    // display: "flex",
    // justifyContent: "center",
    // padding: '0.5%',
    // width: '100%',
    border: '1px solid black'
}

const headerLogoImgStyle = {
    width: '20%'
}

export default HeaderLogo;