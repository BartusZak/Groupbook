import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';

export const addGroup = addGroupErrors => {
    return {
        type: actionTypes.ADD_GROUP,
        addGroupErrors: addGroupErrors
    };
}

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

export const addGroupPictureActionCreator = (picture, groupId, history, name) => {
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

export const fetchGroups = fetchedGroups => {
    return {
        type: actionTypes.FETCH_GROUPS,
        fetchedGroups: fetchedGroups
    };
}

export const fetchGroupsError = fetchedGroupsErrors => {
    return {
        type: actionTypes.FETCH_GROUPS_ERROR,
        fetchedGroupsErrors: fetchedGroupsErrors
    };
}

export const fetchGroupsActionCreator = userId => {
    return dispatch => {
        axios.get("/api/users/" + userId).then(response => {
            dispatch(fetchGroups(response.data));
        }).catch(error => {
            const array = [];
            array.push("Błąd serwera");
       
            dispatch(fetchGroupsError(error.response.status === 404 ? 
            array : error.response.data.errors));
        
        })
    };
}



export const loadGroup = loadedGroup => {
    return {
        type: actionTypes.LOAD_GROUP,
        loadedGroup: loadedGroup
    };
    
}

export const loadGroupErrors = loadedGroupErrors =>{ 
    return {
        type: actionTypes.LOAD_GROUP_ERRORS,
        loadedGroupErrors: loadedGroupErrors
    }
}



export const loadGroupActionCreator = (groupId, history) => {
    return dispatch => {
        axios.get('/api/groups/' + groupId).then(response => {
            
            dispatch(loadGroup(response.data));
            if(history){
                history.push("/logged/group/" + groupId);
            }
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(loadGroupErrors(error.response.status === 404 ? array :
                     error.response.data.errors));
            }
        
        })



    };
}


export const loadRandomGroups = loadedRandomGroups => {
    return {
        type: actionTypes.LOAD_RANDOM_GROUPS,
        loadedRandomGroups: loadedRandomGroups
    };
}
export const loadRandomGroupsErrors = loadedRandomGroupsErrors => {
    return {
        type: actionTypes.LOAD_RANDOM_GROUPS_ERRORS,
        loadedRandomGroupsErrors: loadedRandomGroupsErrors
    };
}

export const loadRandomGroupsActionCreator = userId => {
    return dispatch => {
        axios.get("/api/groups/getrandom/" + userId).then(response => {
            dispatch(loadRandomGroups(response.data));
        }).catch(error =>{ 
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(loadRandomGroupsErrors(error.response.status === 404 ? 
                array : error.response.data.errors));
            }

            
        })
    };
}


export const joinIntoGroup = (joinIntoGroupResult, joinIntoGroupErrors) => {
    return {
        type: actionTypes.JOIN_INTO_GROUP,
        joinIntoGroupResult: joinIntoGroupResult,
        joinIntoGroupErrors: joinIntoGroupErrors
    }
}

export const joinIntoGroupActionCreator = (UserId, GroupId, history) => {
    return dispatch => {
        const objectToSend = {
            UserId: UserId,
            GroupId: GroupId
        }
        axios.post("/api/groups/adduser", objectToSend).then(response => {
            dispatch(joinIntoGroup(true, []));
            dispatch(loadGroupActionCreator(GroupId, history));
            dispatch(loadRandomGroupsActionCreator(GroupId));
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(joinIntoGroup(false, error.response.status === 404 ? 
                array : error.response.data.errors));
            }
        })
    }
}







export const deleteGroup = (deleteGroupResult, deleteGroupErrors) => {
    return {
        type: actionTypes.DELETE_GROUP,
        deleteGroupResult: deleteGroupResult,
        deleteGroupErrors: deleteGroupErrors
    }
}

export const deleteGroupActionCreator = (groupId, token, history, userId) => {
    return dispatch => {
        const config = {
            headers: {'Authorization': "bearer " + token}
        };
        axios.delete(`/api/groups/${groupId}`, config).then(response => {
            dispatch(deleteGroup(true, []));
            dispatch(loadGroupActionCreator(2, history));
            dispatch(fetchGroupsActionCreator(userId));
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(deleteGroup(false, error.response.status === 404 ? 
                array : error.response.data.errors));
            }
        })
    }
}


export const editGroup = (editGroupResult, editGroupErrors) => {
    return {
        type: actionTypes.EDIT_GROUP,
        editGroupResult: editGroupResult,
        editGroupErrors: editGroupErrors
    }
}
export const editGroupAcionCreator = (token, Name, Description, id, loadedGroup, history) => {
    return dispatch => {
        const config = {
            headers: {'Authorization': "bearer " + token}
        };
        let correctName = Name;
        let correctDesc = Description;
        if(correctName === ""){
            correctName = loadedGroup.name;
        }
        if(correctDesc === ""){
            correctDesc = loadedGroup.description;
        }

        const objectToSend = {
            Id: loadedGroup.id, 
            Name: correctName,
            Description: correctDesc
        }
       
        axios.post("/api/groups/update",objectToSend, config).then(response => {
            dispatch(editGroup(true, []));
            dispatch(loadGroupActionCreator(response.data.successResult.id, history));
            dispatch(fetchGroupsActionCreator(id));
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(editGroup(false, !error.response.data.errors ? 
                array : error.response.data.errors));
            }
        })
    }
}

export const addPicture = (addPictureResult, addPictureErrors) => {
    return {
        type: actionTypes.ADD_PICTURE,
        addPictureResult: addPictureResult,
        addPictureErrors: addPictureErrors
    }
}

export const addPictureActionCreator = (picture, groupId, userId, history) => {
    return dispatch => {
        let formData = new FormData();
        formData.append("picture", picture);
        formData.append("groupId", groupId);
        axios({
            method: 'post',
            url: '/api/groups/addpicture',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            dispatch(addPicture(true, []));
            dispatch(fetchGroupsActionCreator(userId));
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(addPicture(false, !error.response.data.errors ? 
                array : error.response.data.errors));
            }
        })
    }
    
}