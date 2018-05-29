import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';

const initialState = {
    response: null,
    addedComments: [],
    addCommentErrors: [],
    addCommentStatus: null
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_COMMENT:
            return updateObject(state, {addedComments: action.addedComments, addCommentErrors: action.addCommentErrors, 
                addCommentStatus: action.addCommentStatus});
        case actionTypes.DELETE_COMMENT:
            return updateObject(state, {response: action.response})
        default:
            return updateObject(state, null)
    }  
}
export default reducer;