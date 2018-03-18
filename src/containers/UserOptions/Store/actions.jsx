import * as actionsTypes from './actionTypes';

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

export const changingValidationMessage = (value) => {
    return {
        type: actionsTypes.CHANGING_VALIDATION_MESSAGE,
        val: value
    };
}
