import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Register from '../../components/Register/Register';
import Aux from '../../hoc/Auxi';
import Navbar from '../../components/Navbar/Navbar';
import HomeContent from '../../components/HomeContent/HomeContent';
import About from '../About/About';
import CenterComponent from '../CenterComponent/CenterComponent';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import UserStart from '../UserStart/UserStart';

class RootContainer extends Component{
    render(){
        return(
            <Aux>
                <Navbar 
                isLogged={this.props.isLogged}
                clicked={this.props.changeLoginState}
                changeNothing={this.props.helperChanging} />

                <CenterComponent>
                    <Route exact path='/' render={() => (
                        <HomeContent clicked={this.props.changeLoginState}/>
                    )}/>
                    <Route exact path='/about' render={() => (
                    <About />
                    )}/>

                    <Route exact path='/register' render={() => (
                        <Register />
                    )}/>

                    <Route path="/logged" exact component={UserStart} />
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
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);