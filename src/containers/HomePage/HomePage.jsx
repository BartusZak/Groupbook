import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Content from '../../components/Content/Content';
import UserPanel from '../../components/UI/UserPanel/UserPanel';

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
            <Navbar isLogged={true}/>
            <Route exact path="/" component={Content} data={userDate}/>
            <Route path="/logged/settings" component={UserPanel} />
            <Route path="/logged/userprofile" component={UserProfile} />
        </Aux>
           

     
      );
    }
  }
  
  export default HomePage;