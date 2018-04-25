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
import axios from 'axios/axios-groupsconnects';
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
            dropdownOpen: false,
            user: null,
            avatarImg: null
        };
        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }
   componentWillMount(){
       if(this.props.responseObject !== null){
        axios.get( '/api/users/' + this.props.responseObject.id)
            .then( response => {
                this.setState({user: response.data});
            })
            .catch(err => {
                this.setState({user: null});
            });
       }
        
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
        let avatar = null;
        if(this.state.user !== null){
            avatar = (this.state.user.profilePicture)? this.state.user.profilePicture.avatar: null;

            if(avatar !== null){
                axios.get( '/pictures/' + avatar, {responseType: "blob"})
                .then( response => {
                   // console.log(response);
                    this.setState({ avatarImg: URL.createObjectURL(response.data)});
                })
                .catch(err => {
                   
                });
            }
        }

        let navbarContent = null;
        let items = null;
        let homePageLink = "/";
        let renderAvatar = null;
        let renderNickname = null;

        
        if (this.state.user !== null){
            renderNickname =  this.state.user.username;
            renderAvatar = <Avatar avatarImg={(!this.state.user.sex)?require('assets/img/empty_avatars/empty_avatar_man.jpg'):require('assets/img/empty_avatars/empty-avatar-girl.jpg')} styles={{height: "100px", width: "100px"}} class="rounded-circle z-depth-0"/> 
            
        }
        if(this.state.avatarImg !== null){
            renderAvatar= <Avatar avatarImg={this.state.avatarImg} styles={{height: "100px", width: "100px"}} class="rounded-circle z-depth-0"/>
        }

        if(this.props.token === "" && this.props.responseObject === null){
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
                    <div style={{margin: "auto", textAlign: "right"}}>
                        <span style={{color: "#898989", fontSize: "small"}}>Zalogowano jako:</span><br/>
                        <span style={{color: "white", display: "block", marginTop: "-10px"}}>{renderNickname}</span>
                    </div>
                   
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav>
                                {renderAvatar}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to="/logged/usersettings">
                                            <i style={{marginRight: "10px"}} className='fa fa-cogs' aria-hidden="true"/>
                                                Ustawienia
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link onClick={window.location.reload} to="/logged/group/poczekalnia">
                                        <i style={{marginRight: "10px"}} className="fa fa-clock-o" aria-hidden="true"></i>
                                                Poczekalnia
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem><i className="fa fa-sign-out" aria-hidden="true"/><NavbarButton name="Wyloguj" path="/" 
                                    clicked={this.props.loggingOut}/></DropdownItem>
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
        token: state.logRed.token
    };
}

export default connect(mapStateToProps, null, null, {pure:false})( NavbarComponent);
