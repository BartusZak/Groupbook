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
        axiosRandom.get('').then(response => {
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


export const fetchingComments = (id, oldComments) => {
    return dispatch => {
        if(!isElementInArray(id, oldComments)){
            let newObjects = {
                id: null,
                comments: []
            }
            axiosRandom.get('/posts/' + id + '/comments').then(response => {
                newObjects.id = id;
                newObjects.comments = response.data;
                oldComments.push(newObjects);
                dispatch(loadComments(oldComments));
                console.log(oldComments);
         
            }).catch(error => {
          
            });
        }
       
    }
    
}
const isElementInArray = (value, array) => {
    let result = null;
    if(array.length === 0){
        result = false;
    }
    else{
        array.forEach( item => {
            if(item.id === value)
            {
                result = true;
            }
        });
    }
    return result;
 
}