import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import Aux from '../../hoc/Auxi';
import PageafterLogin from '../PageAfterLogin/PageAfterLogin';
import Register from '../../components/Register/Register';

class RootContainer extends Component{
  
    render(){
        return(
            <Aux>
                <Route path="/" exact component={HomePage} />
                <Route path="/logged" component={PageafterLogin} />
                <Route path="/register" component={Register} />
            </Aux>
        );
    }
}

export default RootContainer;