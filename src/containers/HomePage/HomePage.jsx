import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Content from '../../components/Content/Content';
import UserPanel from '../../components/UI/UserPanel/UserPanel';
import Register from '../../components/Register/Register';
import About from '../About/About';

import Aux from '../../hoc/Auxi';
import UserProfile from '../UserProfile/UserProfile';

const userDate = [
  {id: 1, login: "wacław", password: "spagettiCode"},
  {id: 2, login: "siemek", password: "monkey"}
]



class HomePage extends Component {
 

    render() {
      return (
        <Aux>
            <Navbar isLogged={false}/>
            <Route exact path="/" component={Content} />
            <Route path="/logged/settings" component={UserPanel} />
            <Route path="/register"  component={Register} />
            <Route path="/logged/userprofile" component={UserProfile} />
            <Route path="/about" component={About}/>
        </Aux>
           

     
      );
    }
  }
  
  export default HomePage;