import * as actionTypes from './actionsTypes'

export const saveResult = (res) => {
    return {
        type: actionTypes.GENERATE_NEXT_POSTS,
        result: res
    };
}

export const storeResult = (res) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(saveResult(res));
        }, 2000)
    }
}