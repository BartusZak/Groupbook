import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    userGroups: [],
    userGroupsErrors: [],

    addPostErrors: [],

    fetchedPosts: [],
    fetchingPostsErrors: [],

    deletePostErrors: [],
    deletePostResult: [],

    editPostResult: null,
    editPostErrors: [],

    editedPost: null
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_USER_GROUPS:
            return updateObject(state, {userGroups: action.userGroups, userGroupsErrors: []})
       
        case actionTypes.FETCH_USER_GROUPS_ERROR:
            return updateObject(state, {userGroupsErrors: action.userGroupsErrors})

        case actionTypes.ADD_POST:
            return updateObject(state, {addPostErrors: action.addPostErrors})

        case actionTypes.FETCH_USER_POSTS:
            return updateObject(state, {fetchedPosts: action.fetchedPosts, fetchingPostsErrors: []})
        
        case actionTypes.FETCH_USER_POSTS_ERRORS:
            return updateObject(state, {fetchingPostsErrors: action.fetchingPostsErrors})
        case actionTypes.DELETE_POST:
            return updateObject(state, { deletePostResult: action.deletePostResult,
                deletePostErrors: action.deletePostErrors})
        case actionTypes.EDIT_POST:
            return updateObject(state, {editPostResult: action.editPostResult,
                editPostErrors: action.editPostErrors})
        case actionTypes.FETCH_EDIT_POST:
            return updateObject(state, { editedPost: action.editedPost})
        
    }
    return state;   
}
export default reducer;