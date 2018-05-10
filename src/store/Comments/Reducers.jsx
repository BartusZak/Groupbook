import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';

const initialState = {
    addedComments: [],
    response: null,
    addCommentsError: ""
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_COMMENT:
            return updateObject(state, {addedComments: action.addedComments});
        case actionTypes.DELETE_COMMENT:
            return updateObject(state, {response: action.response})
        default:
            return updateObject(state, null)
    }  
}
export default reducer;