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

const content = (props) => {
 
    const LoginItems = [
        {id: 1,name: "Login", placeholder: "Wpisz swój login...", text: "", min: 5, max: 15},
        {id: 2,name: "Hasło", placeholder: "Wpisz swoje hasło...", text: "", min: 5, max: 15}
    ]
    return (
        <main className="Content">
            <AppDescription/>
                <Form name="Logowanie" buttonTitle="Zaloguj"
                    loginItems={LoginItems}
                    clicked={props.clicked}
                />
                <div style={{width: '100%', marginTop: '30px'}}></div>
                <Advert/>
                <Authors/>
                <div style={{width: '100%', marginTop: '30px'}}></div>
                <Footer />
        </main> 
    );
   
};


export default content;