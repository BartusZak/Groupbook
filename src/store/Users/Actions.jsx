import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';
import { handleErrors } from '../errorHandler';

export const changeUserId = userId => {
    return {
        type: actionTypes.CHANGE_URL_ID,
        userId: userId
    };
}

export const fetchUsers = (fetchedUsers, fetchUsersErrors, fetchUsersResult) => {
    return  {
        type: actionTypes.FETCH_USERS,
        fetchedUsers: fetchedUsers,
        fetchUsersErrors: fetchUsersErrors,
        fetchUsersResult: fetchUsersResult
    }
}

export const fetchUsersActionCreator = () => {
    return dispatch => {
        axios.get('/api/users').then(response => {
            dispatch(fetchUsers(response.data, [], false));
        }).catch(error => {
            dispatch(fetchUsers([], handleErrors(error), true));
        })
    };
}