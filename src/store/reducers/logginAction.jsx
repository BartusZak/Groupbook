import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    token: "",
    loggingObject: null, 
    logingError: "", // blad 400 podczas logowania czyli zle pasy,


}
const reducer = (state = initialState, action) => {
    switch(action.type){
       case actionTypes.LOGING_IN:
            return updateObject(state, {token: action.token,
                 loggingObject: action.responseObject})
       break;
       case actionTypes.LOGING_ERROR:
            return updateObject(state, {logingError: action.logingError})
       break;
       case actionTypes.LOGING_OUT:
            return updateObject(state, {token: "", loggingObject: null, logingError: ""})
       break;
    }
    return state;   
}
export default reducer;