import axios from 'axios/axios-groupsconnects';

export function changePassword(token, oldPassword, newPassword, confirmedNewPassword){
    return(dispatch)=>{
        let data = {
            OldPassword: oldPassword,
            NewPassword: newPassword,
            ConfirmedNewPassword: confirmedNewPassword
        }

        let config = {
            headers: {'Authorization': "bearer " + token}
        }
        console.log('Actions: ', data, config);
        return (
            axios.post('/api/account/changepassword', data, config)
            .then((response)=>{
                dispatch(passwordChangedSuccess(response.data));
            })
            .catch((error)=>{
                console.log(error.response);
                let errorsTmp = [];
                mapObject(error.response.data, function (key, value) {
                    //console.log("Key:", {key}, "Value:", value[0]);
                    if(value !== null && value !== undefined){
                        errorsTmp.push(value[0]);
                    }
                })
                dispatch(passwordChangedError(error.response, errorsTmp));
            })
        )
    }
}
function mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
}

function passwordChangedSuccess(response){
    return{
        type: "CHANGED_PASSWORD_SUCCESS",
        response: response,
    }
}

function passwordChangedError(response, errors){
    return{
        type: "CHANGED_PASSWORD_ERROR",
        response: response,
        errors: errors
    }
}

export const test = (token, oldPassword, newPassword, confirmedNewPassword) => dispatch => {
    let data = {
        OldPassword: oldPassword,
        NewPassword: newPassword,
        ConfirmedNewPassword: confirmedNewPassword
    }

    let config = {
        method: 'POST',
        headers: {
            'Authorization': "bearer " + token,
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    axios.post('/api/account/changepassword', data, config)
    .then(res => res.json())
    .then((response)=> 
        dispatch({
            type: "TEST",
            payload: response
        }) 
    );

}