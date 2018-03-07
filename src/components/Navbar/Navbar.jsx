import React, { Component } from 'react';
import './Navbar.css';
import Items from './Items/Items';
import Logo from '../Logo/Logo';
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

        navbarContent = (
            <Aux>
                <div id="navUl">
                    <Items items={items}/>
                </div>
                <div id="socialDiv">
                    <a href="http://facebook.com" rel="noopener noreferrer" target="_blank">
                        <i className='fa fa-facebook-square'/>
                    </a>
                    <a href="http://twitter.com" rel="noopener noreferrer" target="_blank"><i className='fa fa-twitter-square'/></a>
                </div>
            </Aux>
            );
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

    return (
        
        <nav className="Navbar">
            <Logo width="300"/>
            {navbarContent}
        </nav>
    );
}
}
export default Navbar;