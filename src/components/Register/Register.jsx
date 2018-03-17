import React from 'react';
import Form from '../Form/Form';
import { RegisterNames, RegisterErrors } from '../NamesForForms/Names';
import { Register } from './Register.style';

const register = () => {
    return ( <Register><Form name="Rejestracja" names={RegisterNames} errors={RegisterErrors} buttonTitle="Dołącz"/> </Register> );
}
export default register;