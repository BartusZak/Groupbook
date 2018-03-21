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
    commentsSpinner: false,
    commentsErrorLoading: false,
    newComment: null,
    addingCommentError: false


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
            return updateObject(state, {commentsErrorLoading: true})
        break;
        case actionTypes.CHANGING_COMMENTS_SPINNER:
            return updateObject(state, {commentsSpinner: action.isLoading})
        break;
        case actionTypes.ADD_COMMENT:
            return updateObject(state, {newComment: action.newComment})
        break;
        
    
      
    }
    return state;   
}
export default reducer;