import React from 'react';
import './Content.css';
import Form from '../Form/Form';
import AppDescription from './AppDescription/AppDescription';
import Advert from '../Advert/Advert';
import Authors from '../Authors/Authors';
import Footer from '../Footer/Footer';

const content = (props) => {
    const LoginItems = [
        {name: "Login", placeholder: "Wpisz swój login..."},
        {name: "Hasło", placeholder: "Wpisz swoje hasło..."}
    ]

    return (
        <main className="Content">

            <AppDescription/>

            <Form name="Logowanie" loginItems={LoginItems} data={props.data}/>

            <div style={{width: '100%', marginTop: '30px'}}></div>
            
            <Advert/>

            <Authors/>

            <div style={{width: '100%', marginTop: '30px'}}></div>

            <Footer/>



        </main> 
    );
   
};


export default content;