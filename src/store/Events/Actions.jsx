import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';



export const addEvent = addEventErrors => {
    return {
        type: actionTypes.ADD_EVENT,
        addEventErrors: addEventErrors
    };
}

export const addEventActionCreator = (name, description, history, pictures) => {
    return dispatch => {

        const storageItem = JSON.parse(localStorage.getItem('responseObject'));

        const newGroup = {
            Name: name,
            Description: description,
            UserId: storageItem.id
        }

        axios.post('/api/groups/add', newGroup).then(response => {
            if(pictures.length > 0){
                dispatch(addGroupPictureActionCreator(pictures[0], 
                    response.data.successResult.id, history, name));
            }
            else{
                history.push({
                    pathname: "/logged/group/" + response.data.successResult.id,
                    state: {addGroupMessage: response.data}
                })
            }     

        }).catch(error => {
            dispatch(addGroup([...error.response.data.errors]))
        })
    }
}

export const addEventPictureActionCreator = (picture, groupId, history, name) => {
    return dispatch => {
        let formData = new FormData();
        formData.set("picture", picture);
        formData.set("groupId", groupId);
        axios({
            method: 'post',
            url: '/api/groups/addpicture',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            history.push({
                pathname: "/logged/group/" + groupId,
                search: '?query=succGroupAdd'
            })
            history.push("/logged/group/" + groupId);
        }).catch(error => {
            dispatch(addGroup([...error.response.data.errors]))
        })
    }
}
