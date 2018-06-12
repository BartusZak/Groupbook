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
export const fetchLastUserId = lastUserId => {
    return {
        type: actionTypes.FETCH_LAST_USER_ID,
        lastUserId: lastUserId
    }
}

export const fetchUsersActionCreator = () => {
    return dispatch => {
        const config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('responseObject')).token}
        }
        axios.get('/api/chat/users', config).then(response => {
            dispatch(fetchLastUserId(response.data[response.data.length-1].id));
            dispatch(fetchUsers(response.data, [], false));
        }).catch(error => {
            dispatch(fetchUsers([], handleErrors(error), true));
        })
    };
}

export const fetchNextUsersActionCreator = (actualUsers, lastUserId) => {
    return dispatch => {
        const config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('responseObject')).token}
        };
        axios.get("/api/chat/users/" + lastUserId, config).then(response => {
            const newActualUsers = [];
            for(let key in actualUsers)
                newActualUsers.push(actualUsers[key]);
            
            if(response.data.length !== 0){
                dispatch(fetchLastUserId(response.data[response.data.length-1].id));
                for(let key in response.data)
                    newActualUsers.push(response.data[key]);
            }
          
            
            dispatch(fetchUsers(newActualUsers, [], false));
            
        }).catch(error => {
            dispatch(fetchUsers([], handleErrors(error), true));
        })

    }
}
