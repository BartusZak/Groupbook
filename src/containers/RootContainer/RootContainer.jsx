import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Aux from '../../hoc/Auxi';
import CenterComponent from '../CenterComponent/CenterComponent';
import * as actionTypes from '../../store/actions/actionsTypes';

import Team from '../../containers/Team/Team';
import asyncComponent from '../../AsyncComponent';
import  { connect } from 'react-redux';
import NotFound from '../../components/NotFound/NotFound';
import Register from '../../components/Register/Register';
import Navbar from '../../components/Navbar/Navbar';
import Logging from '../Logging/Logging';
import About from '../About/About';
import UserStart from '../UserStart/UserStart';
import Carousel from '../../components/Carousel/Carousel';

import Addpost from '../UserOptions/AddPost/Addpost';
import UserSettings from '../UserOptions/UserSettings/UserSettings';
import Posts from '../Posts/Posts';
import Sidebar from '../../components/UI/SideMenu/SideMenu';
import { RightMenuExpander } from './RootContainer.style.jsx';

// @bartuszak Przykład użycia code snipping
// https://scotch.io/tutorials/lazy-loading-routes-in-react 
// const About = asyncComponent(() =>
//     import ('../About/About').then(module => module.default)
// )

// const Register = asyncComponent(() =>
//     import ('../../components/Register/Register').then(module => module.default)
// ) <Route path="/posts" exact component={Komponent} />"

class RootContainer extends Component{
    render(){
        
        let IsLogged = null;
        if(this.props.isLogged)
        IsLogged = (
                <Aux>
                    
                    <Route path="/logged/newpost" exact component={Addpost} />
                    <Route path="/logged/usersettings" exact component={UserSettings} />
                </Aux>
            );

        let IsLoggedMenuExpander = null;
            if(this.props.isLoggedMenuExpander)
            {
                //wysuwanie menu po naciśnięciu (DO ZAIMPLEMENTOWANIA)+ dodać aktualizowanie stanu
                IsLoggedMenuExpander = (
                    <Aux>
                        <i style={{marginLeft: "-4px"}} className="fa fa-angle-left" aria-hidden="true"></i>
                    </Aux>
                );
            }
            else {
                //przewijanie strony do góry (DO ZAIMPLEMENTOWANIA) + dodać aktualizowanie stanu
                IsLoggedMenuExpander = (
                    <Aux>
                        <i className="fa fa-angle-up" aria-hidden="true"></i>
                    </Aux>
                );
            }
           
        
            
        return(
            <Aux>
                <Navbar />
                <CenterComponent currentUrl={window.location.href}>
                    <Switch> {/*@bartuszak*/}
                        <Route exact path='/' render={() => (
                        <About />
                        )}/>
                        <Route exact path='/logging' render={() => (
                            <Logging clicked={this.props.changeLoginState}/>
                        )}/>
                        <Route exact path='/register' render={() => (
                            <Register />
                        )}/>
                        <Route path="/logged" exact component={UserStart} />
                        <Route path="/team"  component={Team} />
                        <Route path="/carousel" component={Carousel}/>
                      
                        <Route path="/logged/posts" exact component={Posts} />
                        {IsLogged}

                        
                        
                        
                       
                        <Route path="*" component={NotFound} />{/*@bartuszak*/}
                    </Switch>{/*@bartuszak*/}
                </CenterComponent>
                
                
                <RightMenuExpander>
                    {IsLoggedMenuExpander}
                </RightMenuExpander>
             
             
               
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.logRed.isLogin
    }
}
export default connect(mapStateToProps, null, null, {pure:false})(RootContainer);
