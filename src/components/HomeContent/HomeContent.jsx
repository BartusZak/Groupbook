import React from 'react';
import './HomeContent.css';
import Form from '../Form/Form';
import AppDescription from './AppDescription/AppDescription';
import Advert from './Advert/Advert';
import Authors from './Authors/Authors';
import Footer from './Footer/Footer';
import Aux from '../../hoc/Auxi';
import { Route } from 'react-router-dom'; 
import Register from '../Register/Register';
import {
    Container,
    Row,
    Col,
    Grid
  } from 'reactstrap';

const content = (props) => {
 
    const LoginItems = [
        {id: 1,name: "Login", placeholder: "Wpisz swój login...", text: "", min: 5, max: 15},
        {id: 2,name: "Hasło", placeholder: "Wpisz swoje hasło...", text: "", min: 5, max: 15}
    ]
    const errors = [
        {id: 1, msg: "", isError: false},
        {id: 2, msg: "", isError: false}
    ]
    return (
        <div className="container-fluid" style={{marginTop: "30px"}}>
            <Row >
                <Col lg={6} md={12} sm={12} xs={12} className="appDescriptionParent">
                    <AppDescription/>
                </Col>
                <Col lg={6} md={12} sm={12} xs={12}>
                    <Form name="Logowanie" buttonTitle="Zaloguj"
                        loginItems={LoginItems}
                        clicked={props.clicked}
                        errors={errors}
                    />
                </Col>  
            </Row>

            <Row style={{marginTop: "30px"}}>
                <Col lg={6} md={12} sm={12} xs={12} className="advertParent">
                    <Advert/>
                </Col>
                <Col lg={6} md={12} sm={12} xs={12} className="col-push-12">
                    <Authors/>
                </Col>  
            </Row>
            
            <Row>
                <Col>
                    <Footer />
                </Col>
            </Row>
                
        </div> 
    );
   
};


export default content;