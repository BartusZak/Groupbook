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
                        <a href="http://facebook.com" rel="noopener noreferrer" target="_blank">
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
            <Aux>
                <div className="NavbarContainer">
                    <Searcher items={items}/>
                    <Avatar />
                    <NavLink to="/logged/settings">
                        <i style={{fontSize: '32px', color: 'white'}} className='fa fa-cogs' />
                    </NavLink>
                    <NavbarButton name="Wyloguj" path="/"/>
                   
                </div>
            </Aux>
            );
        }
        return(
            <nav className="Navbar">
                <Logo width="300"/>
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