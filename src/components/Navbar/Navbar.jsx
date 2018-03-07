import React from 'react';
import './Navbar.css';
import Items from './Items/Items';
import Logo from '../Logo/Logo';
import 'font-awesome/css/font-awesome.min.css';
import {Link, NavLink} from 'react-router-dom';
import Aux from '../../hoc/Auxi';
import NavbarButton from '../UI/NavbarButton/NavbarButton';
import Searcher from '../UI/Searcher/Searcher';


const navbar = (props) => {

    let navbarContent = null;
    let items = null;


    if(!props.isLogged){
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
            <div className="NavbarContainer">
                <Searcher items={items}/>
                <NavLink to="/logged/settings" >
                    <a className="SettingsIco" href="http://twitter.com" rel="noopener noreferrer" target="_blank"><i style={{fontSize: '32px'}} className='fa fa-cogs'/></a>
                </NavLink>
                
               
            </div>
        );
    }

   

   
    return (
        
        <nav className="Navbar">
            <Logo width="300"/>
            {navbarContent}
        </nav>
    );
}

export default navbar;