import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';

const initialState = {
   
}
const reducer = (state = initialState, action) => {
    switch(action.type){
       case actionTypes.ADD_GROUP:
            return updateObject(state, {})
            break; 
    }
    return state;   
}
export default reducer;