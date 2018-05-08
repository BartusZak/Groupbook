let defaultState = {
    response: null,
    errors: []
}

const mainReducer = (state=defaultState, action)=>{
    if( action.type === "CHANGED_PASSWORD_SUCCESS"){
        return{
            ...state,
            response: action.response,
        }
    }
    else if (action.type === "CHANGED_PASSWORD_ERROR"){
        return{
            ...state,
            response: action.response,
            errors: action.errors
        }
    }
    else {
        return{
            ...state //czy state??
        }
    }
}

export default mainReducer;