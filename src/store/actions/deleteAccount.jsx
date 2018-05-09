import axios from 'axios/axios-groupsconnects';

export function deleteAccount(token){
    return(dispatch)=>{
        let data = {
        }

        let config = {
            headers: {'Authorization': "bearer " + token}
        }
        return (
            axios.post('', data, config)
            .then((response)=>{
                dispatch(accountRemovedSuccessfull(response.data));
            })
            .catch((error)=>{
                dispatch(accountRemovedUnSuccessfull(error.response));
                console.log(error.response);
            })
        )
    }
}


function accountRemovedSuccessfull(response){
    return{
        type: "ACCOUNT_REMOVED_SUCCESSFULL",
        response: response,
        loading: false
    }
}

function accountRemovedUnSuccessfull(response){
    return{
        type: "ACCOUNT_REMOVED_UNSUCCESSFULL",
        response: response,
        loading: false
    }
}

export function setLoadingToTrue(){
    return{
        type: "SET_LOADING_TO_TRUE",
        loading: true
    }
}