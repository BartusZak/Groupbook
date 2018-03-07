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

<<<<<<< HEAD
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
=======
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
                   
>>>>>>> de4da7899065e5d0fd8d9a5533923ca2acff0139
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
<<<<<<< HEAD

   

   
    return (
        
        <nav className="Navbar">
            <Logo width="300"/>
            {navbarContent}
        </nav>
    );
=======
>>>>>>> de4da7899065e5d0fd8d9a5533923ca2acff0139
}


export default Navbar;