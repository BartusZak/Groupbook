import * as actionTypes from './ActionTypes';
import axios from '../../axios-groupsconnects';


export const addGroupActionCreator = (name, description, history, pictures) => {
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
                    response.data.successResult.id, history));
            }
            else{
               
                history.push("/logged/group/" + response.data.successResult.id);
                
            }
                

        }).catch(error => {
          

        })
    }
}



export const addGroupPictureActionCreator = (picture, groupId, history) => {
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
            history.push("/logged/group/" + groupId);
        }).catch(error => {
        })
    }
}