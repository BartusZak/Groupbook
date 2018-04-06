import React, { Component } from 'react';
import './Navbar.css';
import Items from './Items/Items';
import Logo from '../Logo/Logo';
import 'font-awesome/css/font-awesome.min.css';
import {Link} from 'react-router-dom';
import Aux from '../../hoc/Auxi';
import NavbarButton from '../UI/NavbarButton/NavbarButton';
import Searcher from '../UI/Searcher/Searcher';
import Avatar from '../UI/Avatar/Avatar';
import logoIcon from '../../assets/img/logo/groupsconnectsLogoSmall.png';
import { connect } from 'react-redux';
import { setTrue } from '../../store/actions/loggingActions';

import {Container} from 'reactstrap';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';


import {
    NavbarBrandStyled,
    SocialUl,
    MenuUl,
    MenuAfterLogIn
} from './Navbar.style';

class NavbarComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    
    render(){
        let navbarContent = null;
        let items = null;
        let homePageLink = "/";

        if(!this.props.isLogged){
            items = [
                {id: 1, name: "Rejestracja", url: "/register"},
                {id: 2, name: "Logowanie", url: "/logging"} 
            ];

            navbarContent = (
                <Aux>
                <MenuUl>
                    <NavbarNav className="ml-auto">
                        <Items items={items}/>
                    </NavbarNav>
                </MenuUl>
                    <SocialUl className="navbar-nav">
                        <li className="nav-item">
                            <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
                                <i  className='fa fa-facebook-square'/>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="http://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className='fa fa-twitter-square'/>
                            </a>
                        </li>
                    </SocialUl>
                </Aux>
                   
                );
            }
            else{
                items = ["Grupa", "Post", "Użytkownik"];
                
                homePageLink = "/logged/group/poczekalnia";

                navbarContent = (
                <MenuAfterLogIn>
                    <Searcher items={items}/>

                    <ul className="navbar-nav ml-auto nav-flex-icons">
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav>
                                    <Avatar styles={{height: "11vh"}} className="rounded-circle z-depth-0"/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to="/logged/usersettings">
                                            <i style={{marginRight: "10px"}} className='fa fa-cogs' aria-hidden="true"/>
                                                Ustawienia
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/logged/group/poczekalnia">
                                        <i style={{marginRight: "10px"}} className="fa fa-clock-o" aria-hidden="true"></i>
                                                Poczekalnia
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem><i className="fa fa-sign-out" aria-hidden="true"/><NavbarButton name="Wyloguj" path="/" clicked={() => this.props.changeLoginState()}/></DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                    </ul>
                       
                    
                </MenuAfterLogIn>
                );
            }
            return(
                <Navbar className="navbar navbar-expand-lg navbar navbar-dark bg-dark lovedMenu" expand="md" scrolling>
                    <Container fluid={true}>
                        <NavbarBrandStyled className="navbar-brand">
                            <div className="smallLogo">
                                <Link to={homePageLink} className="navIconLogo">
                                    <img src={logoIcon} alt="logo icon"/>
                                </Link>
                            </div>
                            <div className="mainLogo">
                                <Logo to={homePageLink} anchorClass="navLogo" width="300"/>
                                <span className="logoSubtitle">Ludzie z pasją!</span>
                            </div>
                                
                               
                        </NavbarBrandStyled>
                        { !this.state.isWideEnough && <NavbarToggler style={{width:"30%"}} onClick = { this.onClick } />}
                        <Collapse isOpen = { this.state.collapse } navbar>
                            {navbarContent}
                        </Collapse>
                    </Container>
                </Navbar>
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
