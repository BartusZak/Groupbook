import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    userId: null
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_URL_ID:
            return updateObject(state, {userId: action.userId})
        
    }
    return state;   
}
export default reducer;