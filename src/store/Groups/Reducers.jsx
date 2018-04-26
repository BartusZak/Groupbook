import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    addGroupErrors: [],

    fetchedGroups: [],
    fetchedGroupsErrors: [],

    loadedGroup: {},
    loadedGroupErrors: []
}
const reducer = (state = initialState, action) => {
    switch(action.type){
       case actionTypes.ADD_GROUP:
            return updateObject(state, {addGroupErrors: action.addGroupErrors})
       case actionTypes.FETCH_GROUPS:
            return updateObject(state, {fetchedGroups: action.fetchedGroups, fetchedGroupsErrors: []})

       case actionTypes.FETCH_GROUPS_ERROR:
            return updateObject(state, {fetchedGroupsErrors: action.fetchedGroupsErrors})

       case actionTypes.LOAD_GROUP:
            return updateObject(state, {loadedGroup: action.loadedGroup, loadedGroupErrors: []})

       case actionTypes.LOAD_GROUP_ERRORS:
            return updateObject(state, {loadedGroupErrors: action.loadedGroupErrors})
    }
    return state;   
}
export default reducer;