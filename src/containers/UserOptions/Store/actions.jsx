import * as actionsTypes from './actionTypes';
import axios from '../../../axios-firebase';

export const changingPostTitle = (value) => {
    return {
        type: actionsTypes.CHANGING_POST_TITLE,
        val: value
    };
}
export const changingPostContent = (value) => {
    return {
        type: actionsTypes.CHANGING_POST_CONTENT,
        val: value
    };
}

export const redirectingToTrue = (value) => {
    return {
        type: actionsTypes.REDIRECTING_TO_TRUE,
        val: value
    };
}
export const initializePosts = (posts) => {
    return {
        type: actionsTypes.LOADING_POSTS,
        posts: posts
    };
}
export const fetchingPostsFailed = () => {
    return {
        type: actionsTypes.FETCHING_POSTS_FAILED
    };
}
export const changingSpinnerState = (result) => {
    return {
        type: actionsTypes.CHANGING_SPINNER_STATE,
        isLoading: result
    };
}
export const fetchingPosts = () => {
    return dispatch => {
        dispatch(changingSpinnerState(true));
        let posts = null;
        axios.get('https://groupbook-6e7d3.firebaseio.com/posts.json').then(response => {
            dispatch(initializePosts(response.data));
            dispatch(changingSpinnerState(false));
        
        }).catch(error => {
            dispatch(fetchingPostsFailed());
            dispatch(changingSpinnerState(false));
        });

       
    }
}