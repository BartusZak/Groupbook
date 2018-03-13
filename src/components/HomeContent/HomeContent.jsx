import React from 'react';
import './HomeContent.css';
import Form from '../Form/Form';
import AppDescription from './AppDescription/AppDescription';
import Advert from '../Advert/Advert';
import Authors from '../Authors/Authors';
import Footer from './Footer/Footer';
import Aux from '../../hoc/Auxi';
import { Route } from 'react-router-dom'; 
import Register from '../Register/Register';
import {
    Container,
    Row,
    Col,
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
        <Container>
            <AppDescription/>
                <Form name="Logowanie" buttonTitle="Zaloguj"
                    loginItems={LoginItems}
                    clicked={props.clicked}
                    errors={errors}
                />
                <div style={{width: '100%', marginTop: '30px'}}></div>
                <Advert/>
                <Authors/>
                <div style={{width: '100%', marginTop: '30px'}}></div>
                <Footer />
        </Container> 
    );
   
};


export default content;