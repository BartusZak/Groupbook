import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';

export const addComment = addedComments => {
    return {
        type: actionTypes.ADD_COMMENT,
        addedComments: addedComments
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
        axios.post('api/comments/add', newComment).then(response => {
            dispatch(addComment(response.data.successResult.post.comments));
        }).catch(error => {
        })
    }
}