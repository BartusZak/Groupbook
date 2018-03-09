import React from 'react';
import Form from '../Form/Form';

import Aux from '../../hoc/Auxi';
const register = () => {
    const RegisterItems = [
      {id: 1, name: "Login", placeholder: "Wpisz swój login...", text: "", min: 5, max: 15},
      {id: 2, name: "Hasło", placeholder: "Wpisz swoje hasło...", text: "", min: 5, max: 15},
      {id: 3, name: "Powtórz hasło", placeholder: "Powtórz Swoje hasło...", text: "", min: 5, max: 15},
      {id: 4, name: "Imię", placeholder: "Wpisz Swoje imię...", text: "", min: 5, max: 15},
      {id: 5, name: "Nazwisko", placeholder: "Wpisz Swoje Nazwisko...", text: "", min: 5, max: 15}, 
      {id: 6, name: "Adres e-mail", placeholder: "Wpisz Swój e-mail...", text: "", min: 5, max: 15}, 
    ]
    return (
      <Aux>
          <Form name="Rejestracja" loginItems={RegisterItems} buttonTitle="Dołącz"/>
      </Aux>
    );
}


  
  export default register;