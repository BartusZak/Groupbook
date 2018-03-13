import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Aux from '../../hoc/Auxi';
import CenterComponent from '../CenterComponent/CenterComponent';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import asyncComponent from '../../AsyncComponent';

import NotFound from '../../components/NotFound/NotFound';
import Register from '../../components/Register/Register';
import Navbar from '../../components/Navbar/Navbar';
import HomeContent from '../../components/HomeContent/HomeContent';
import About from '../About/About';
import UserStart from '../UserStart/UserStart';
import Carousel from '../../components/Carousel/Carousel';

// @bartuszak Przykład użycia code snipping
// https://scotch.io/tutorials/lazy-loading-routes-in-react 
// const About = asyncComponent(() =>
//     import ('../About/About').then(module => module.default)
// )

// const Register = asyncComponent(() =>
//     import ('../../components/Register/Register').then(module => module.default)
// )

class RootContainer extends Component{
    render(){
        return(
            <Aux>
                <Navbar 
                isLogged={this.props.isLogged}
                clicked={this.props.changeLoginState}
                changeNothing={this.props.helperChanging} />

                <CenterComponent >
                    <Switch> {/*@bartuszak*/}
                        <Route exact path='/' render={() => (
                        <About />
                        )}/>
                        <Route exact path='/logging' render={() => (
                            <HomeContent clicked={this.props.changeLoginState}/>
                        )}/>
                      

                        <Route exact path='/register' render={() => (
                            <Register />
                        )}/>

                        <Route path="/logged" exact component={UserStart} />
                        
                        <Route path="/carousel" component={Carousel}/>
                        <Route path="*" component={NotFound} />{/*@bartuszak*/}
                    </Switch>{/*@bartuszak*/}
                </CenterComponent>
             
             
               
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLogged: state.isLogin
    };
}
const mapDispatchToProps = dispatch => {
    return {
        changeLoginState: () => dispatch({type: actionTypes.SET_TRUE}),
        helperChanging: () => dispatch({type: actionTypes.ONLY_TRUE})

    };
}
export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(RootContainer);
