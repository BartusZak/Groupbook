import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    isLogin: false,
    userName: ""
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_TRUE:
            return updateObject(state, {isLogin: !state.isLogin, userName: ""})
        break;
        case actionTypes.LOG_IN:
            return updateObject(state, {isLogin: action.val, userName: action.userName});
        break;
    }
    return state;   
}
export default reducer;