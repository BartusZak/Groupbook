import * as actionTypes from '../actions/actionsTypes';
import { updateObject} from '../utility';

const initialState = {
    isLogin: false
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_TRUE:
            return updateObject(state, {isLogin: !state.isLogin})
        break;
        case actionTypes.LOG_IN:
            return updateObject(state, {isLogin: action.val});
        break;
    }
    return state;   
}
export default reducer;