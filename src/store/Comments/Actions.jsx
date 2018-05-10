import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';

export const addComment = addedComments => {
    return {
        type: actionTypes.ADD_COMMENT,
        addedComments: addedComments
    };
}

export const deleteComment = response => {
    return {
        type: actionTypes.DELETE_COMMENT,
        response: response
    };
}


export const addCommentsActionCreator = (content, postId) => {
    return dispatch => {
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        const newComment = {
                Content: content,
                PostId: postId,
                AuthorId: responseObject.id
        }
        console.log(newComment);
        axios.post('api/comments/add', newComment).then(response => {
            console.log(response.data);
            dispatch(addComment(response.data.successResult.post.comments));
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const deleteCommentsActionCreator = (commentId) => {
    return dispatch => {
        let config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('responseObject')).token}
        }
        axios.delete(`api/comments/ ${commentId}`, config).then(response => {
            console.log(response);
            dispatch(deleteComment(response.status));
        }).catch(error => {
            console.log(error.response);
        })
    }
}