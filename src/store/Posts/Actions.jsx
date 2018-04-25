import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';

export const fetchUserGroups = fetchedGroups => {
    return {
        type: actionTypes.FETCH_USER_GROUPS,
        userGroups: fetchedGroups
    };
}
export const fetchUserGroupsError = error => {
    return {
        type: actionTypes.FETCH_USER_GROUPS_ERROR,
        userGroupsErrors: error
        
    };
}
export const fetchUserGroupsActionCreator = (userId) => {
    return dispatch => {
        axios.get('/api/users/'+userId).then(response => {
            dispatch(fetchUserGroups(response.data.userGroups));
        }).catch(error => {
            const array = [];
            array.push(error.response);
            dispatch(fetchUserGroupsError(array));
        })
    }
}


export const addPost = errors => {
    return{
        type: actionTypes.ADD_POST,
        addPostErrors: errors
    };
}

export const addPostActionCreator = (files, addedGroups, postTitle, postContent, authorId, history, groupToPush) => {
    return dispatch => {
        const groupsIds = addedGroups.map(i => {
            return i.group.id
        })
        const newPost = {
            Title: postTitle,
            Content: postContent,
            GroupsIds: groupsIds,
            AuthorId: authorId
        }
        axios.post('/api/posts/add', newPost).then(response => {
            if(files.length === 0){
                history.push({
                    pathname: "/logged/group/" + groupToPush,
                    search: '?query=succPostAdd'
                })
                
            }
            else{
                dispatch(addPostPictureActionCreator(response.data.successResult.posts, 
                files, history, groupToPush));
            }
            
           
        }).catch(error => {
            dispatch(addPost(error.response.data.errors));
        })
    }
}

export const addPostPictureActionCreator = (addedPosts, files, history, groupToPush) => {
    return dispatch => {
       
            let formData = new FormData();
            const idsArray = addedPosts.map(i => {
                return i.id
            })
            idsArray.forEach(function (value){
                formData.append('postsIds['+ idsArray.indexOf(value) +']', value);
            });
            formData.append('pictures',files[0]);
            axios({
                method: 'post',
                url: '/api/posts/addpictures',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(response => {
                history.push({
                    pathname: "/logged/group/" + groupToPush,
                    state: {addPostMessage: response.data}
                })
                
            }).catch(error => {
                dispatch(addPost(error.response.data.errors));
            })
            
        
    }
    
}