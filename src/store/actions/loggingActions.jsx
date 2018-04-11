import * as actionsTypes from './actionsTypes';
import axios from '../../axios-groupsconnects';

export const logingIn = (token, responseObject) => {
    return {
        type: actionsTypes.LOGING_IN,
        token: token,
        responseObject: responseObject,
    };
}
export const errorInLoggingProcedure = (logingError) => {
    return {
        type: actionsTypes.LOGING_ERROR,
        logingError: logingError
    }
}
export const fetchingLogingIn = (username, password, router) => {
    return dispatch => {
        const loginData = {
            Username: username,
            Password: password
        }
        axios.post('/api/account/login', loginData).then(response => {
            const responseObject = response.data.successResult;
            dispatch(logingIn(responseObject.token, responseObject));
            dispatch(errorInLoggingProcedure(""));
            router.push('logged/group/poczekalnia');
        }).catch( error => {
            dispatch(errorInLoggingProcedure("Zły login lub hasło"));
            dispatch(logingIn("", "", "", ""));
        })
    }
}
export const loggingOut = () => {
    return {
        type: actionsTypes.LOGING_OUT
    }
}