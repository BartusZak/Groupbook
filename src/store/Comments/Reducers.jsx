import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';

const initialState = {
    addedComments: [],

    addCommentsError: ""
}
const reducer = (state = initialState, action) => {
    switch(action.type){
       case actionTypes.ADD_COMMENT:
            return updateObject(state, {addedComments: action.addedComments})
            break; 
    }
    return state;   
}
export default reducer;