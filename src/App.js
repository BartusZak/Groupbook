import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import RootContainer from './containers/RootContainer/RootContainer';

import HomePage from './containers/HomePage/HomePage';

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
