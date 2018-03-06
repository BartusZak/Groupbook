import React from 'react';
import './Content.css';
import Form from '../Form/Form';



const content = () => {
    const LoginItems = [
        {name: "Login", placeholder: "Wpisz swój login..."},
        {name: "Hasło", placeholder: "Wpisz swoje hasło..."}
    ]
    return (
        <main className="Content">
            <div>siema</div>
            <Form name="Logowanie" loginItems={LoginItems}/>
        </main> 
    );
   
};


export default content;