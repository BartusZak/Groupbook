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
import Carousel from '../../components/Carousel/Carousel';

import Addpost from '../UserOptions/AddPost/Addpost';
import UserSettings from '../UserOptions/UserSettings/UserSettings';
import SideMenu from '../../components/UI/SideMenu/SideMenu';
import SideMenuContent from '../../components/UI/SideMenu/SideMenuContent/SideMenuContent';
import { RightMenuExpander } from './RootContainer.style.jsx';
import Group from '../Group/Group';

import EventDetails from '../../components/EventDetails/EventDetails';
import AddPostForm from '../UserOptions/AddPostForm/AddPostForm';
// @bartuszak Przykład użycia code snipping
// https://scotch.io/tutorials/lazy-loading-routes-in-react 
// const About = asyncComponent(() =>
//     import ('../About/About').then(module => module.default)
// )

// const Register = asyncComponent(() =>
//     import ('../../components/Register/Register').then(module => module.default)
// ) <Route path="/posts" exact component={Komponent} />"
//<Route path="/repos/:userName/:repoName" component={Repo}/>

class RootContainer extends Component{
    state = {
        showSideMenu: false
    }
    ClickOnSideMenuHandler = () => {
        this.setState({showSideMenu: !this.state.showSideMenu});
    }
    ControlViewPortHandler = () => {
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
          });
          
    }

    render(){
        
        let IsLogged = null;
        let IsLoggedMenuExpander = null;

        if(this.props.isLogged)
        {
            IsLogged = (
                <Aux>
                    <Route path="/logged/group/:id" exact component={Group} />
                    <Route path="/logged/usersettings" exact component={UserSettings} />
                    <Route path="/logged/newpost" exact component={Addpost} />
                    <Route path="/logged/event/:id" exact component={EventDetails} />

                    
                </Aux>
            );

            if(!this.state.showSideMenu)
            {
                IsLoggedMenuExpander = (
                    <Aux>
                        <i onClick={() => this.ClickOnSideMenuHandler()} style={{marginLeft: "-4px"}} className="fa fa-angle-left" aria-hidden="true"></i>
                    </Aux>
                );
            }else {
                IsLoggedMenuExpander = (
                    <Aux>
                        <i onClick={() => this.ClickOnSideMenuHandler()} className="fa fa-angle-right" aria-hidden="true"></i>
                    </Aux>
                );
            }
            
        }
        else {
                IsLoggedMenuExpander = (
                    <Aux>
                        <i onClick={() => this.ControlViewPortHandler()} className="fa fa-angle-up" aria-hidden="true"></i>
                    </Aux>
                );
            }
           
        
            
        return(
            <Aux>
                <Navbar />
                <SideMenu IsDisplay={this.state.showSideMenu}>
                    <SideMenuContent clicked={() => this.ClickOnSideMenuHandler()} IsLogged={this.props.isLogged}/>
                </SideMenu> 
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
                    
                        <Route path="/team"  component={Team} />
                        <Route path="/carousel" component={Carousel}/>
                        <Route path="/logged/addpost" exact component={AddPostForm} />
                        
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
