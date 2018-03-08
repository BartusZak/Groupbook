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


import Register from '../../components/Register/Register';
import Aux from '../../hoc/Auxi';


const userDate = [
  {id: 1, login: "wacław", password: "spagettiCode"},
  {id: 2, login: "siemek", password: "monkey"}
]



class HomePage extends Component {

    render() {

      return (
        <Aux>
            <Navbar isLogged={false} />
            <Content />
        </Aux>
           

     
      );
    }
  }
  
  export default HomePage;