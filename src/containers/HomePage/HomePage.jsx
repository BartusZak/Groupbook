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

import UserProfile from '../UserProfile/UserProfile';
class HomePage extends Component {
    render() {
      return (
        <Aux>
            <Navbar isLogged={false}/>
            <Route exact path="/" component={Content} />
            <Route path="/logged/settings" component={UserPanel} />
<<<<<<< HEAD
            <Route path="/register"  component={Register} />
=======
            <Route path="/logged/userprofile" component={UserProfile} />
>>>>>>> de4da7899065e5d0fd8d9a5533923ca2acff0139
        </Aux>
           

     
      );
    }
  }
  
  export default HomePage;