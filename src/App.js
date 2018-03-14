import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ReallySmoothScroll from 'really-smooth-scroll';

import RootContainer from './containers/RootContainer/RootContainer';

ReallySmoothScroll.shim();

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <RootContainer />
        </div>
      </Router>
    );
  }
}

export default App;
