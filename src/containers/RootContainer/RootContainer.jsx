import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Aux from '../../hoc/Auxi';
import CenterComponent from '../CenterComponent/CenterComponent';
import * as actionTypes from '../../store/actions/actionsTypes';

import Team from '../../containers/Team/Team';
//import asyncComponent from '../../AsyncComponent';// @bartuszak Przykład użycia code snipping
import  { connect } from 'react-redux';
import NotFound from '../../components/NotFound/NotFound';
import Register from '../../containers/Register/Register';
import Navbar from '../../components/Navbar/Navbar';
import Logging from '../Logging/Logging';
import About from '../About/About';
import Carousel from '../../components/Carousel/Carousel';

import UserSettings from '../UserOptions/UserSettings/UserSettings';
import SideMenu from '../../components/UI/SideMenu/SideMenu';
import SideMenuContent from '../../components/UI/SideMenu/SideMenuContent/SideMenuContent';
import { RightMenuExpander } from './RootContainer.style.jsx';
import Group from '../Group/Group';

import EventDetails from '../../components/EventDetails/EventDetails';
import AddPostForm from '../UserOptions/AddPostForm/AddPostForm';
import AddEventForm from '../UserOptions/AddEventForm/AddEventForm';
import AddGroupForm from '../UserOptions/AddGroupForm/AddGroupForm';
import UserDetails from '../UserDetails/UserDetails';
// @bartuszak Przykład użycia code snipping
// https://scotch.io/tutorials/lazy-loading-routes-in-react 
// const About = asyncComponent(() =>
//     import ('../About/About').then(module => module.default)
// )

// const Register = asyncComponent(() =>
//     import ('../../components/Register/Register').then(module => module.default)
// ) <Route path="/posts" exact component={Komponent} />"
//<Route path="/repos/:userName/:repoName" component={Repo}/>
import { loggingOut } from '../../store/actions/loggingActions';
import { withRouter } from 'react-router-dom';
import './RootContainer.css';
import SearchBlock from '../../components/SearchBlock/SearchBlock';
import Transition from 'react-transition-group/Transition';

class RootContainer extends Component{
    state = {
        showSideMenu: false,
        localStorage: null,
        openSearchBar: false,
        searchValue: ""
    }
    componentDidMount(){
        this.setState({localStorage: 
            JSON.parse(localStorage.getItem('responseObject'))})
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
    loggout = () => {
        localStorage.clear();
        this.setState({localStorage: null});
        this.props.loggingOut();
    }
    onSearchHandler = e => {
        this.setState({searchValue: e.target.value, openSearchBar: 
            e.target.value !== "" ? true : false});
    }

    render(){
        let IsLogged = null;
        let IsLoggedMenuExpander = null;
        if(this.props.token || this.state.localStorage !== null)
        {
            IsLogged = (
                <Aux>
                    <Route path="/logged/group/:id" exact component={Group} />
                    <Route path="/logged/event/:id" exact component={EventDetails} />
                    <Route path="/logged/usersettings" exact component={UserSettings} />
                    <Route path='/logged/addgroup' component={AddGroupForm} />
                    <Route path="/logged/addevent" exact component={AddEventForm} />
                    <Route path="/logged/addpost" exact component={AddPostForm} />
                    <Route path='/logged/user/:id' component={UserDetails} />
                    
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
                <Navbar 
                value={this.state.searchValue}
                searchValue={this.state.searchValue}
                search={e => this.onSearchHandler(e)}
                closeSearch={() => this.setState({openSearchBar: false, searchValue: ""})}
                loggingOut={() => this.loggout()} 
                responseObject={JSON.parse(localStorage.getItem('responseObject'))}/>
                <SideMenu IsDisplay={this.state.showSideMenu}>
                    <SideMenuContent clicked={() => this.ClickOnSideMenuHandler()} IsLogged={this.props.isLogged}/>
                </SideMenu> 
                <CenterComponent currentUrl={window.location.href}>
                    

                <Transition 
                mountOnEnter 
                unmountOnExit 
                in={this.state.openSearchBar}
                timeout={400}>
                    {state => (
                        <SearchBlock value={this.state.searchValue} 
                        close={() => this.setState({openSearchBar: false, searchValue: ""})}
                        animClass={this.state.openSearchBar ? 
                        "search-block-in" : "search-block-out"}/>
                    )}
                </Transition>


                    



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
                        

                        {IsLogged}
                        {/*@TESTING*/}
                        

                       
                        
                        
                       
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
        token: state.logRed.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loggingOut: () => dispatch(loggingOut())
    };
}
export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(withRouter(RootContainer));
