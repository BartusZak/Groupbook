import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';

export const fetchUserGroups = fetchedGroups => {
    return {
        type: actionTypes.FETCH_USER_GROUPS,
        userGroups: fetchedGroups
    };
}
export const fetchUserGroupsError = error => {
    return {
        type: actionTypes.FETCH_USER_GROUPS_ERROR,
        userGroupsErrors: error
        
    };
}
export const fetchUserGroupsActionCreator = (userId) => {
    return dispatch => {
        axios.get('/api/users/'+userId).then(response => {
            dispatch(fetchUserGroups(response.data.userGroups));
        }).catch(error => {
            const array = [];
            array.push(error.response);
            dispatch(fetchUserGroupsError(array));
        })
    }
}