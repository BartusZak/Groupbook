import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    userId: null,

    fetchedUsers: [],
    fetchUsersErrors: [],
    fetchUsersResult: null
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_URL_ID:
            return updateObject(state, {userId: action.userId})
        case actionTypes.FETCH_USERS:
            return updateObject(state, { fetchedUsers: action.fetchedUsers, 
            fetchUsersErrors: action.fetchUsersErrors, fetchUsersResult: action.fetchUsersResult})
        
    }
    return state;   
}
export default reducer;