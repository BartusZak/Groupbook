import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Content from '../../components/Content/Content';


import Aux from '../../hoc/Auxi';

class HomePage extends Component {
    render() {
      return (
        <Aux>
            <Navbar />
            <Route exact path="/" component={Content} />
         
        </Aux>
           

     
      );
    }
  }
  
  export default HomePage;