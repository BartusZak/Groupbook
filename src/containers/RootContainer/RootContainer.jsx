import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../../components/Register/Register';
import Aux from '../../hoc/Auxi';
import Navbar from '../../components/Navbar/Navbar';
import HomeContent from '../../components/HomeContent/HomeContent';
import About from '../About/About';
import CenterComponent from '../CenterComponent/CenterComponent';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import UserStart from '../UserStart/UserStart';
import NotFound from '../../components/NotFound/NotFound';

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
                            <HomeContent clicked={this.props.changeLoginState}/>
                        )}/>
                        <Route exact path='/about' render={() => (
                        <About />
                        )}/>

                        <Route exact path='/register' render={() => (
                            <Register />
                        )}/>

                        <Route path="/logged" exact component={UserStart} />
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
