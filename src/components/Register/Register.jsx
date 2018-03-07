import React, { Component } from 'react';
import Form from '../Form/Form';

import Aux from '../../hoc/Auxi';

const RegisterItems = [
    {name: "Login", placeholder: "Wpisz Swój login..."},
    {name: "Hasło", placeholder: "Wpisz Swoje hasło..."},
    {name: "Powtórz hasło", placeholder: "Powtórz Swoje hasło..."},
    {name: "Imię", placeholder: "Wpisz Swoje imię..."},
    {name: "Nazwisko", placeholder: "Wpisz Swoje Nazwisko..."}, 
    {name: "Adres e-mail", placeholder: "Wpisz Swój e-mail..."}, 
    

]

class Register extends Component {
    
    render() {
      return (
        <Aux>
            <Form name="Rejestracja" loginItems={RegisterItems}/>
        </Aux>
           

     
      );
    }
  }
  
  export default Register;