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
export const settingLocalStorageSupport = (lsSupport) => {
    return {
        type: actionsTypes.SETTING_LOCAL_STORAGE_SUPPORT_ERROR,
        lsSupport: lsSupport
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
            if (typeof(Storage) !== "undefined") {
                dispatch(settingLocalStorageSupport(true));
                localStorage.setItem('responseObject', JSON.stringify(responseObject));
            } else {
                dispatch(settingLocalStorageSupport(false));
            }
            dispatch(logingIn(responseObject.token, responseObject));
            dispatch(errorInLoggingProcedure(""));
            router.push('logged/group/poczekalnia');
            window.location.reload();
            
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