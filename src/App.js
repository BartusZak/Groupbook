import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import ScrollFixer from './hoc/ScrollFixer/ScrollFixer';


import RootContainer from './containers/RootContainer/RootContainer';
class App extends Component {
  render() {
    return (
      <Router>
        <ScrollFixer>
            <div className="App" style={{paddingBottom: "50px"}}>
              <RootContainer />
            </div>
        </ScrollFixer>
      </Router>
    );
  }
}

export default App;
