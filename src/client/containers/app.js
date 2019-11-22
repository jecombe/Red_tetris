import React from 'react';

import Header from './header';
import Main from './main';
import Footer from './footer';

function App() {
	return (
	<div style={style.AppWrapper}>
		<Header />
		<Main />
		<Footer />
    </div>
  );
}

const style = {
	AppWrapper: {
		display: 'flex',
		flexDirection: 'column'
	}
}

export default App;
