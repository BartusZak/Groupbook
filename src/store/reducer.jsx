import * as actionTypes from './actions';

const initialState = {
    isLogin: false,
    history: "",
    postData: [],
    startPoint: 0,
    endPoint: 4
 
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_TRUE:
            return {
                ...state,
                isLogin: !state.isLogin
            }
            break;
        case actionTypes.ONLY_TRUE:
            
            return {
                ...state,
                history: state.history + "1"
            }

            break;
        case actionTypes.GENERATE_NEXT_POSTS:
            return {
                ...state,

            }
            break;
    }
    return state;   
}
export default reducer;