import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Register from '../../components/Register/Register';
import HomePage from '../HomePage/HomePage';
import Aux from '../../hoc/Auxi';
import PageafterLogin from '../PageAfterLogin/PageAfterLogin';
class RootContainer extends Component{
    
    render(){
        return(
            <Aux>
                <Route path="/" exact component={HomePage} />
                <Route path="/logged" exact component={PageafterLogin} />
                <Route path="/register" exact component={Register} />
            
            </Aux>
        );
    }
}

export default RootContainer;