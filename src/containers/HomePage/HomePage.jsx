import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Content from '../../components/Content/Content';
<<<<<<< HEAD
=======
import UserPanel from '../../components/UI/UserPanel/UserPanel';
import Register from '../../components/Register/Register';
import About from '../About/About';
>>>>>>> b421dbef253bcbc78ddc898ec398e97e068c3fa0


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
<<<<<<< HEAD
            <Navbar isLogged={false} />
            <Content />
=======
            <Navbar isLogged={false}/>
            <Route exact path="/" component={Content} />
            <Route path="/logged/settings" component={UserPanel} />
            <Route path="/register"  component={Register} />
            <Route path="/logged/userprofile" component={UserProfile} />
            <Route path="/about" component={About}/>
>>>>>>> b421dbef253bcbc78ddc898ec398e97e068c3fa0
        </Aux>
           

     
      );
    }
  }
  
  export default HomePage;