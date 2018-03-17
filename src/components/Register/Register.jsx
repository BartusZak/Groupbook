import React from 'react';
import Form from '../Form/Form';
import Aux from '../../hoc/Auxi';
import { RegisterNames, RegisterErrors } from '../NamesForForms/Names';
const register = () => {
    return ( <Aux> <Form name="Rejestracja" names={RegisterNames} errors={RegisterErrors} buttonTitle="Dołącz"/> </Aux> );
}
export default register;