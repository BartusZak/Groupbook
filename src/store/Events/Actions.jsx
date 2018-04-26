import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';



export const addEvent = addEventErrors => {
    return {
        type: actionTypes.ADD_EVENT,
        addEventErrors: addEventErrors
    };
}

export const addEventActionCreator = (files, addedGroups, eventTitle,
    eventContent, eventDate, authorId, history, groupToPush) => {

    return dispatch => {

        const storageItem = JSON.parse(localStorage.getItem('responseObject'));

        const newEvent = {
            Title: eventTitle,
            Description: eventContent,
            EventDate: eventDate,
            UserId: storageItem.id,
            GroupsIds: addedGroups
        }

        axios.post('/api/events/add', newEvent).then(response => {
            if(files.length > 0){
               // dispatch(addEventPictureActionCreator(pictures[0], 
                   // response.data.successResult.id, history, name));
            }
            else{
                history.push("/logged/events/1" + response.data.successResult.id);
            }     

        }).catch(error => {
            dispatch(addEvent([...error.response.data.errors]))
        })
    }
}

export const addEventPictureActionCreator = (picture, groupId, history, name) => {
    return dispatch => {
        let formData = new FormData();
        formData.set("picture", picture);
        formData.set("eventId", groupId);
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
            dispatch(addEvent([...error.response.data.errors]))
        })
    }
}
