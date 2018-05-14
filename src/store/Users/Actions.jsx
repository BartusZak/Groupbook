import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';

export const changeUserId = userId => {
    return {
        type: actionTypes.CHANGE_URL_ID,
        userId: userId
    };
}