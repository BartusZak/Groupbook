import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';

export const addComment = (addedComments, addCommentErrors, addCommentStatus) => {
    return {
        type: actionTypes.ADD_COMMENT,
        addedComments: addedComments,
        addCommentErrors: addCommentErrors,
        addCommentStatus: addCommentStatus
    };
}


export const deleteComment = response => {
    return {
        type: actionTypes.DELETE_COMMENT,
        response: response
    };
}


export const addCommentsActionCreator = (content, postId, taggedUsers, backupComments) => {
    return dispatch => {
        const config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('responseObject')).token}
        }
        const taggedUsersIds = taggedUsers.map(i => {
            return i.user.id
        });
        const newComment = {
            Content: content,
            PostId: postId,
            TaggedUsersIds: taggedUsersIds
        }
        axios.post('api/comments/add', newComment, config).then(response => {
            dispatch(addComment(response.data.successResult.post.comments, [], true));
        }).catch(error => {
            const array = [];
            array.push("Przepraszamy coś poszło nie tak");
            const errors = error.response.hasOwnProperty('status') ? error.response.data.errors : 
                array;

            dispatch(addComment(backupComments, errors, false));
        });
    }
}

export const deleteCommentsActionCreator = (commentId) => {
    return dispatch => {
        let config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('responseObject')).token}
        }
        axios.delete(`api/comments/ ${commentId}`, config).then(response => {
            dispatch(deleteComment(response.status));
        }).catch(error => {
        })
    }
}

export const editCommentsActionCreator = (commentId, content) => {
    return dispatch => {
        let config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('responseObject')).token}
        }
        let data = {
            Id: commentId,
            Content: content
        }
        axios.post(`/api/comments/update`, data, config).then(response => {
            //dispatch(deleteComment(response.status));
        }).catch(error => {
        })
    }
}