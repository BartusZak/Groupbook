let defaultState = {
    response: null,
    loading: false
}

const mainReducer = (state=defaultState, action)=>{
    if( action.type === "ACCOUNT_REMOVED_SUCCESSFULL"){
        return{
            ...state,
            response: action.response,
            loading: action.loading
        }
    }
    if ( action.type === "ACCOUNT_REMOVED_UNSUCCESSFULL"){
        return{
            ...state,
            response: action.response,
            loading: action.loading
        }
    }
    else if ( action.type === "SET_LOADING_TO_TRUE"){
        return{
            ...state,
            loading: action.loading
        }
    }
    else {
        return{
            ...state //czy state??
        }
    }
}

export default mainReducer;