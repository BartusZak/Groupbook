import * as actionTypes from './actionTypes';
import { updateObject } from '../../../store/utility';

const initialState = {
    postTitleInput: "",
    postContentArea: "",
    
    isRedirecting: false,
    posts: [],
    errorPostLoading: false,
    spinner: false,


    comments: [],
    commentsErrorLoading: "",
    newComment: null,
    addingCommentError: false,

    loadedGroups: [],
    loadingGroupsError: false,


    //dodawanie grup
    fetchedUsers: [], 
    fetchingUsersError: false

}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGING_POST_TITLE:
            return updateObject(state, {postTitleInput: action.val})
        break;
        case actionTypes.CHANGING_POST_CONTENT:
            return updateObject(state, {postContentArea: action.val})
        break;
        case actionTypes.REDIRECTING_TO_TRUE:
            return updateObject(state, {isRedirecting: action.val})
        break;
        case actionTypes.LOADING_POSTS:
            return updateObject(state, {posts: action.posts, errorPostLoading: false})
        break;
        case actionTypes.FETCHING_POSTS_FAILED:
            return updateObject(state, {errorPostLoading: true})
        break;
        case actionTypes.CHANGING_SPINNER_STATE:
            return updateObject(state, {spinner: action.isLoading})
        break;

        
        case actionTypes.LOAD_COMMENTS:
            return updateObject(state, {comments: action.comments})
        break;
        case actionTypes.FETCHING_COMMENTS_ERROR:
            return updateObject(state, {commentsErrorLoading: action.val})
        break;
        case actionTypes.ADD_COMMENT:
            return updateObject(state, {newComment: action.newComment})
        break;

        case actionTypes.LOAD_GROUPS:
            return updateObject(state, { loadedGroups: action.loadedGroups, loadingGroupsError: false})
        break;
        case actionTypes.LOADING_GROUPS_ERROR:
            return updateObject(state, { loadingGroupsError: true})
        break;

        case actionTypes.FETCHING_USERS:
            return updateObject(state, { fetchedUsers: action.fetchedUsers, fetchingUsersError: false })
        break;
        case actionTypes.FETCHING_USERS_ERROR:
            return updateObject(state, { fetchingUsersError: true} )
        break;
    
      
    }
    return state;   
}
export default reducer;