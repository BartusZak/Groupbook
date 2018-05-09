import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    addGroupErrors: [],

    fetchedGroups: [],
    fetchedGroupsErrors: [],

    loadedGroup: {},
    loadedGroupErrors: [],

    loadedRandomGroups: [],
    loadedRandomGroupsErrors: [],
    
    
    joinIntoGroupResult: null,
    joinIntoGroupErrors: [],

    deleteGroupResult: null,
    deleteGroupErrors: [],

    editGroupResult: null,
    editGroupErrors: []
    

}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.EDIT_GROUP:
            return updateObject(state, { editGroupResult: action.editGroupResult,
                editGroupErrors: action.editGroupErrors})
                
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

        case actionTypes.LOAD_RANDOM_GROUPS:
            return updateObject(state, {loadedRandomGroups: action.loadedRandomGroups, loadedRandomGroupsErrors: []})
       
        case actionTypes.LOAD_RANDOM_GROUPS_ERRORS:
            return updateObject(state, {loadedRandomGroupsErrors: action.loadedRandomGroupsErrors})

        case actionTypes.JOIN_INTO_GROUP:
            return updateObject(state, {joinIntoGroupResult: action.joinIntoGroupResult,
                joinIntoGroupErrors: action.joinIntoGroupErrors})
        
        case actionTypes.DELETE_GROUP:
            return updateObject(state, { deleteGroupResult: action.deleteGroupResult, 
                deleteGroupErrors: action.deleteGroupErrors})
        
    }
    return state;   
}
export default reducer;