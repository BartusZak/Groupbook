import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    addEventErrors: []
}
const reducer = (state = initialState, action) => {
    switch(action.type){
       case actionTypes.ADD_EVENT:
            return updateObject(state, {addEventErrors: action.addEventErrors})
     
    }
    return state;   
}
export default reducer;