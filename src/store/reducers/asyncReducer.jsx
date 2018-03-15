import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    postData: [],
    groupData: []
 
}
const asyncReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOAD_GROUPS_DATA:
            return {
                ...state,
            }
            break;
        case actionTypes.LOAD_POST_DATA:
            return {
                ...state,
            }
            break;
    }
    return state;   
}
export default asyncReducer;