import React from 'react';
import Form from 'components/Form/Form';
import { RegisterNames, RegisterErrors } from 'components/NamesForForms/Names';
import { Register } from './Register.style';

const register = () => {
    return ( <Register><Form name="Rejestracja" names={RegisterNames} errors={RegisterErrors} buttonTitle="Dołącz"/> </Register> );
}
export default register;