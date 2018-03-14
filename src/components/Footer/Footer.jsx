import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Aux from 'hoc/Auxi';
import {
    Container,
    Row,
    Col,
  } from 'reactstrap';

import Logo from '../../components/Logo/Logo';
import FontAwesome from 'react-fontawesome';

import {FooterContainer, AfterFooter, FooterMain} from './Footer.style';

class Footer extends Component {
    render() {
        return (
        <FooterContainer>
            <FooterMain>
                <Container>
                    <Row>
                    <Col md="3" sm="6" xs="12">
                        <Logo width={"100%"}/>

                    </Col>
                    <Col md="3" sm="6" xs="12">
                        <h4>Menu</h4>
                        <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">Polityka Prywatności</Link></li>
                        <li><Link to="/">Kontakt</Link></li>
                        <li><Link to="/">Social Media</Link></li>
                        <li><Link to="/team">Team</Link></li>   
                        </ul>               
                    </Col>
                    <Col md="3" sm="6" xs="12">
                        <h4>Aktualności</h4>
                    </Col>
                    <Col md="3" sm="6" xs="12">
                        <h4>Kontakt</h4>
                        <ul className="contact">
                            <li> 
                                <FontAwesome
                                    className='faa-wrench animated'
                                    name='phone'
                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                />    
                                    +48 000 000 000
                            </li>
                            <li>
                                <FontAwesome
                                    className='faa-horizontal animated'
                                    name='envelope'
                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                />  
                                    kontakt@groupsconnects.pl
                            </li>
                            <li>
                                <FontAwesome
                                    className='faa-float animated'
                                    name='globe'
                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                />   
                                    www.groupsconnects.pl
                            </li>
                        </ul>
                    </Col>
                    </Row>
                </Container>
            </FooterMain>

            <AfterFooter>
                <Container>
                <Row>
                    <p>
                    Portal stworzony na porzeby zaliczenia przedmiotu "Projekt Zespołowy".<br/>
                    Uniwersytet Warmińsko-Mazurski w Olsztynie<br/>
                    Wydział Matematyki i Informatyki<br/>
                    2017/2018
                    </p>
                </Row>
                </Container>
            </AfterFooter>
        </FooterContainer>

        );
    }
}
export default Footer;