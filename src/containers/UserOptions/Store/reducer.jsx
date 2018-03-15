import * as actionTypes from './actionTypes';
import { updateObject } from '../../../store/utility';

const initialState = {
    postTitleInput: "",
    postContentArea: ""
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGING_POST_TITLE:
            return updateObject(state, {postTitleInput: action.val})
        break;
        case actionTypes.CHANGING_POST_CONTENT:
            return updateObject(state, {postContentArea: action.val})
        break;
    }
    return state;   
}
export default reducer;