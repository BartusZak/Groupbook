import React, { Component } from 'react';
import './Navbar.css';
import Items from './Items/Items';
import logo from '../../assets/img/logo/groupsconnects.png';
import 'font-awesome/css/font-awesome.min.css';
import {Link, NavLink} from 'react-router-dom';
import Aux from '../../hoc/Auxi';
import NavbarButton from '../UI/NavbarButton/NavbarButton';
import Searcher from '../UI/Searcher/Searcher';
import Avatar from '../UI/Avatar/Avatar';

class Navbar extends Component{
    state = {
        isLogged: this.props.isLogged
    }
    onLogoutHandler = () => {
        this.setState({isLogged: false});
    }

    render(){
        let navbarContent = null;
        let items = null;

        if(!this.state.isLogged){
            items = [
                {id: 1, name: "O nas", url: "/about"},
                {id: 2, name: "Rejestracja", url: "/register"} 
            ];
    
            navbarContent = (
                <Aux>
                    <div id="navUl">
                        <Items items={items}/>
                    </div>
                    <div id="socialDiv">
                        <a href="http://twitter.com" rel="noopener noreferrer" target="_blank">
                            <i className='fa fa-facebook-square'/>
                        </a>
                        <a href="http://twitter.com" rel="noopener noreferrer" target="_blank"><i className='fa fa-twitter-square'/></a>
                    </div>
                </Aux>
               
            );
        }
        else{
            items = ["Grupa", "Post", "Użytkownik"];
    
            navbarContent = (
                <div className="NavbarContainer">
                    <Searcher items={items}/>
                    <Avatar />
    
                    <NavLink to="/logged/settings" >
                        <i style={{fontSize: '32px', color: 'white'}} className='fa fa-cogs'/>
                    </NavLink>
                    <NavbarButton name="Wyloguj" logout={this.onLogoutHandler}/>
                   
                </div>
            );
        }

        return(
            <nav className="Navbar">
                <div id="logoDiv">
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                {navbarContent}
            </nav>
        );
    }
}


export default Navbar;