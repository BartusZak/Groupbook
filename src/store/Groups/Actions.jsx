import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';

export const addGroupPicture = addPictureResult => {
    return {
       type: actionTypes.ADD_GROUP_PICTURE,
       addPictureResult: addPictureResult
    };
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
            dispatch(addGroupPicture(new String("")));
            history.push("/logged/group/" + groupId);
        }).catch(error => {
            dispatch(addGroupPicture(new String("Wystąpił błąd podczas dodadwania zdjęcia do grupy")));
            console.log(error.response);
        })
    }
}