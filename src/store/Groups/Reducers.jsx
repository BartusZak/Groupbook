import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    addGroupErrors: []
}
const reducer = (state = initialState, action) => {
    switch(action.type){
       case actionTypes.ADD_GROUP:
            return updateObject(state, {addGroupErrors: action.addGroupErrors})
        
    }
    return state;   
}
export default reducer;