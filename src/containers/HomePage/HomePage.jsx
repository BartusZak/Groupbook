import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Content from '../../components/Content/Content';
import UserPanel from '../../components/UI/UserPanel/UserPanel';
import Register from '../../components/Register/Register';

import Aux from '../../hoc/Auxi';

class HomePage extends Component {
    render() {
      return (
        <Aux>
            <Navbar isLogged={false}/>
            <Route exact path="/" component={Content} />
            <Route path="/logged/settings" component={UserPanel} />
            <Route path="/register"  component={Register} />
        </Aux>
           

     
      );
    }
  }
  
  export default HomePage;