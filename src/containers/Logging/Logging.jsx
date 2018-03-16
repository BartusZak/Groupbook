import React from 'react';
import './HomeContent.css';
import Form from '../../components/Form/Form';
import AppDescription from './AppDescription/AppDescription';
import Advert from '../../components/Carousel/Carousel';
import Footer from './Footer/Footer';
import {
    Row,
    Col,
  } from 'reactstrap';

import {LoggingContent} from './Logging.style';

const content = (props) => {
 
    const LoginItems = [
        {id: 1,name: "Login", placeholder: "Login", text: "", min: 5, max: 15},
        {id: 2,name: "Hasło", placeholder: "Hasło", text: "", min: 5, max: 15}
    ]
    const errors = [
        {id: 1, msg: "", isError: false},
        {id: 2, msg: "", isError: false}
    ]

    const advertImages = [

        {id: 1, src: require("../../assets/img/homePage/billennium.png"), alt: "logo billennium"},
        {id: 2, src: require("../../assets/img/homePage/uwmLogo.png"), alt: "logo uwm"}  
    ]
    return (
        <LoggingContent className="container-fluid">
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

            <Row>
                <Col lg={6} md={12} sm={12} xs={12} className="advertParent">
                   
                </Col>
                <Col lg={6} md={12} sm={12} xs={12} className="col-push-12">
                    <Advert images={advertImages} width="450" height="150"/>
                </Col>  
            </Row>
            
            <Row>
                <Col>
                    <Footer />
                </Col>
            </Row>
                
        </LoggingContent> 
    );
   
};


export default content;