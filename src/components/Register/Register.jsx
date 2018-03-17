import React from 'react';
import Form from '../Form/Form';

import Aux from '../../hoc/Auxi';
const register = () => {
    const RegisterItems = [
      {id: 1, name: "Login", placeholder: "Login", min: 5, max: 15},
      {id: 2,name: "Hasło", placeholder: "Hasło", min: 5, max: 15},
      {id: 3, name: "Powtórz hasło", placeholder: "Powtórz Swoje hasło...", min: 5, max: 15},
      {id: 4, name: "Imię", placeholder: "Wpisz Swoje imię...", min: 5, max: 15},
      {id: 5, name: "Nazwisko", placeholder: "Wpisz Swoje Nazwisko...", min: 5, max: 15}, 
      {id: 6, name: "Adres e-mail", placeholder: "Wpisz Swój e-mail...", min: 5, max: 15}, 
    ]
    const errors = [
      {id: 1, msg: "", isError: false},
      {id: 2, msg: "", isError: false},
      {id: 3, msg: "", isError: false},
      {id: 4, msg: "", isError: false},
      {id: 5, msg: "", isError: false},
      {id: 6, msg: "", isError: false}

    ]
    return (
      <Aux>
          <Form name="Rejestracja" loginItems={RegisterItems} errors={errors} buttonTitle="Dołącz"/>
      </Aux>
    );
}


  
  export default register;