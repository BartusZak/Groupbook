import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    userGroups: [],
    userGroupsErrors: []
}
const reducer = (state = initialState, action) => {
    switch(action.type){
       case actionTypes.FETCH_USER_GROUPS:
            return updateObject(state, {userGroups: action.userGroups, userGroupsErrors: []})
       
       case actionTypes.FETCH_USER_GROUPS_ERROR:
            return updateObject(state, {userGroupsErrors: action.userGroupsErrors})
    }
    return state;   
}
export default reducer;