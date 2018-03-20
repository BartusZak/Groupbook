import * as actionTypes from './actionTypes';
import { updateObject } from '../../../store/utility';

const initialState = {
    postTitleInput: "",
    postContentArea: "",
    
    isRedirecting: false,
    posts: [],
    errorPostLoading: false,
    spinner: false,

    comments: []
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
    
      
    }
    return state;   
}
export default reducer;