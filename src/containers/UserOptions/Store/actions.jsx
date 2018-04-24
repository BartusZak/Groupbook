import * as actionsTypes from './actionTypes';
import axios from 'axios/axios-firebase';
import axiosRandom from 'axios/axios-post';
import trueAxios from 'axios/axios-groupsconnects';

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


export const changingSpinnerState = (result) => {
    return {
        type: actionsTypes.CHANGING_SPINNER_STATE,
        isLoading: result
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
export const fetchingPosts = () => {
    return dispatch => {
        axios.get('/posts.json').then(response => {
            dispatch(initializePosts(response.data));
        }).catch(error => {
            dispatch(fetchingPostsFailed());
        });

       
    }
}
export const loadComments = (comments) => {
    
    return {
        type: actionsTypes.LOAD_COMMENTS,
        comments: comments
    };
}
const fetchingCommentsError = (value) => {
    return {
        type: actionsTypes.FETCHING_COMMENTS_ERROR,
        val: value
    };
}

export const fetchingComments = (id) => {
    return dispatch => {
        let Data = null;
        let commentsToShow = [];
        let Response = null;
        axios.get('/comments.json').then( response => {
            Data = Object.keys(response.data).
                map( igKey => {
                    return response.data[igKey];
                });
            const Result = Data.map(item => item.idOfPost);
            for(let i = 0; i < Result.length; i++){
                if(Result[i] === id)
                    commentsToShow.push(Data[i]);
            }
            dispatch(loadComments(commentsToShow));
        }).catch(error => {
            dispatch(fetchingCommentsError(id));
        })
        return commentsToShow;
    }
    
}


export const loadGroups = (groups) => {
    return {
        type: actionsTypes.LOAD_GROUPS,
        loadedGroups: groups
    }
}
export const loadingGroupsError = () => {
    return {
        type: actionsTypes.LOADING_GROUPS_ERROR
    }
}
export const fetchingGroups = () => {
    return dispatch => {
        trueAxios.get('/api/groups').then(response => {
            dispatch(loadGroups(response.data));
        }).catch(error => {
            dispatch(loadingGroupsError());
        });
      
    }
}




export const addComment = (newComment) => {
    return {
        type: actionsTypes.ADD_COMMENT,
        newComment: newComment
    };
}
export const updateComments = (newComment, id, author) => {
    return dispatch => {
        const objectsToSend = {
            addDate: new Date().toLocaleString(),
            idOfPost: id,
            content: newComment,
            author: author
        }
        axios.post('/comments.json', objectsToSend)
        .then( response => {
            dispatch(addComment(objectsToSend));
            dispatch(fetchingComments(id));
        }).catch( error => {
        })
    }
}



// Dodawanie grup

export const fetchingUsers = (fetchedUsers) => {
    return{
        type: actionsTypes.FETCHING_USERS,
        fetchedUsers: fetchedUsers
    };
}
export const fetchingUsersError = () => {
    return {
        type: actionsTypes.FETCHING_USERS_ERROR
    };
}
export const fetchingUsersHandler = () => {
    return dispatch => {
        trueAxios.get('/api/users').then(response => {
            dispatch(fetchingUsers(response.data));
        }).catch(error => {
            dispatch(fetchingUsersError());
        })
    }
}