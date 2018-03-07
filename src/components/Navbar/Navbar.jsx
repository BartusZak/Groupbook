import React from 'react';
import './Navbar.css';
import Items from './Items/Items';
import logo from '../../assets/img/logo/groupsconnects.png';
import 'font-awesome/css/font-awesome.min.css';
import {Link} from 'react-router-dom';

const navbar = (props) => {

    const itemsBeforeLogIn = [
        {id: 1, name: "O nas", url: "/about"},
        {id: 2, name: "Rejestracja", url: "/register"} 
    ]

    const itemsAfterLogIn = [
        {id: 1, name: "Edytuj profil", url: "/"} 
    ]
    
    const result = props.result ? itemsAfterLogIn : itemsBeforeLogIn;
    return (
        
        <nav className="Navbar">
        
                <div id="logoDiv">
                    <Link to="/">
                        <img  id="logo" src={logo} alt="logo"/>
                    </Link>
                </div>

                <div id="navUl">
                    <Items items={result}/>
                </div>
                
                <div id="socialDiv">
                <a href="http://twitter.com" rel="noopener noreferrer" target="_blank">
                    <i className='fa fa-facebook-square'/>
                </a>
                    <a href="http://twitter.com" rel="noopener noreferrer" target="_blank"><i className='fa fa-twitter-square'/></a>
                </div>
        </nav>
    );
}

export default navbar;