import React from 'react';

import FooterBar from '../components/footerBar';

const Footer = props => {
  return (
    <div style={style.FooterStyle}>
        <FooterBar />
    </div>
  );
};

const style = {
    FooterStyle: {
        height: '5vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default Footer;
