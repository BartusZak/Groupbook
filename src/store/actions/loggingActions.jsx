import * as actionsTypes from './actionsTypes';

export const setTrue = () => {
    return {
        type: actionsTypes.SET_TRUE
    };
}

export const logIn = (value) => {
    return {
        type: actionsTypes.LOG_IN,
        val: value
    };
}