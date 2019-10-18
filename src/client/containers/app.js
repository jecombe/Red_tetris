import React from 'react';
import { connect } from 'react-redux';
import Tetris from '../components/Tetris';

function App() {
  return (
    <div className="App">
      <Tetris />
    </div>
  );
}
const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, null)(App);
