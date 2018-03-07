import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Content from './components/Content/Content';
import About from './components/About/About';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Content} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
