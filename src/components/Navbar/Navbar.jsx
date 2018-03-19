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
import logoIcon from '../../assets/img/logo/groupsconnectsLogoSmall.png';
import { connect } from 'react-redux';
import { setTrue } from '../../store/actions/loggingActions';
import { 
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
} from 'react-bootstrap';

class NavbarComponent extends Component{
    render(){
        let navbarContent = null;
        let items = null;
    
        if(!this.props.isLogged){
            items = [
                {id: 1, name: "Rejestracja", url: "/register"},
                {id: 2, name: "Logowanie", url: "/logging"} 
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
                        <Link to="/logged/usersettings">
                            <i style={{fontSize: '32px', color: 'white'}} className='fa fa-cogs' />
                        </Link>
                        <NavbarButton name="Wyloguj" path="/" clicked={() => this.props.changeLoginState()}/>
                       
                    </div>
                </Aux>
                );
            }
            return(
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                        <a href="#brand">React-Bootstrap</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                        <NavItem eventKey={1} href="#">
                            Link
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Link
                        </NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            Link Right
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Link Right
                        </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>

                // <nav className="Navbar">
                //     <Logo  anchorClass="navLogo" width="300"/>
                //     <span className="logoSubtitle">Ludzie z pasją!</span>
                    
                //     <Link to="/" className="navIconLogo">
                //         <img src={logoIcon} alt="logo icon"/>
                //     </Link>
                //     {navbarContent}
                // </nav>
            );
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.logRed.isLogin
    };
}
const mapDispatchToProps = dispatch => {
    return {
        changeLoginState: () => dispatch(setTrue())
    };
}
export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})( NavbarComponent);