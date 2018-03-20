import * as actionsTypes from './actionTypes';
import axios from '../../../axios-firebase';
import axiosRandom from '../../../axios-post';

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
        axios.get('/posts.json').then(response => {
            dispatch(initializePosts(response.data));
            dispatch(changingSpinnerState(false));
        }).catch(error => {
            dispatch(fetchingPostsFailed());
            dispatch(changingSpinnerState(false));
        });

       
    }
}




export const loadComments = (comments) => {
    return {
        type: actionsTypes.LOAD_COMMENTS,
        comments: comments
    };
}


const fetchingCommentsError = () => {
    return {
        type: actionsTypes.FETCHING_COMMENTS_ERROR
    };
}
const changingCommentsSpinner = (value) => {
    return {
        type: actionsTypes.CHANGING_COMMENTS_SPINNER,
        isLoading: value
    };
}
export const fetchingComments = (id) => {
    return dispatch => {
        dispatch(changingCommentsSpinner(true));
        axiosRandom.get('/posts/' + id + '/comments').then(response => {
            dispatch(loadComments(response.data));
            dispatch(changingCommentsSpinner(false));
           
        }).catch(error => {
            dispatch(fetchingCommentsError());
            dispatch(changingCommentsSpinner(false));
        });
    }
    
}