import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';

const initialState = {
    addPictureResult: "",
    addGroupResult: ""
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case action.ADD_GROUP_PICTURE:
            return updateObject(state, {addPictureResult: action.addPictureResult})
        case action.ADD_GROUP:
            return updateObject(state, {addGroupResult: action.addGroupResult})
        
           
    }
    return state;   
}
export default reducer;