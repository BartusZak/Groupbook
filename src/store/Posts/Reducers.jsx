import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    userGroups: [],
    userGroupsErrors: [],

    addPostErrors: []
}
const reducer = (state = initialState, action) => {
    switch(action.type){
       case actionTypes.FETCH_USER_GROUPS:
            return updateObject(state, {userGroups: action.userGroups, userGroupsErrors: []})
       
       case actionTypes.FETCH_USER_GROUPS_ERROR:
            return updateObject(state, {userGroupsErrors: action.userGroupsErrors})

       case actionTypes.ADD_POST:
            return updateObject(state, {addPostErrors: action.addPostErrors})
    }
    return state;   
}
export default reducer;