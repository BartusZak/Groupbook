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
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(addPost(error.response.status === 404 ? 
                array : error.response.data.errors));
            }
            
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
                if(error.response){
                    const array = [];
                    array.push("Błąd serwera");
                    dispatch(addPost(error.response.status === 404 ? 
                    array : error.response.data.errors));
                }
            })
            
        
    }
    
}



export const fetchUserPosts = fetchedPosts => {
    return{
        type: actionTypes.FETCH_USER_POSTS,
        fetchedPosts: fetchedPosts
    };
}
export const fetchUserPostsErrors = fetchingPostsErrors => {
    return{
        type: actionTypes.FETCH_USER_POSTS_ERRORS,
        fetchingPostsErrors: fetchingPostsErrors
    };
}

export const fetchUserPostsActionCreator = userId => {
    return dispatch => { 
        axios.get('/api/users/'+userId).then(response => {
            dispatch(fetchUserPosts(response.data));
        }).catch(error => {
            const array = [];
            array.push("Błąd serwera");    
            dispatch(fetchUserPostsErrors(error.response.status === 404 ? 
                array : error.response.data.errors));

        })
    };
}

export const deletePost = (deletePostResult, deletePostErrors) => {
    return {
        type: actionTypes.DELETE_POST,
        deletePostResult: deletePostResult,
        deletePostErrors: deletePostErrors
    }
}

export const deletePostActionCreator = (token, postId) => {
    return dispatch => {
        const config = {
            headers: {'Authorization': "bearer " + token}
        };
        axios.delete(`/api/posts/${postId}`, config).then(response => {
            dispatch(deletePost(true, []));
            console.log(response.data);
        }).catch(error => {
            console.log(error.response);
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(deletePost(false, !error.response.data.errors ? 
                array : error.response.data.errors));
            }
        })
    }
}

export const editPost = (editPostResult, editPostErrors) => {
    return {
        type: actionTypes.EDIT_POST,
        editPostResult: editPostResult,
        editPostErrors: editPostErrors
    }
}

export const editPostActionCreator = (token, Name, Description, postId, currName, currDesc) => {
    return dispatch => {
        const config = {
            headers: {'Authorization': "bearer " + token}
        };
        let correctName = Name;
        let correctDesc = Description;
        if(correctName === ""){
            correctName = currName;
        }
        if(correctDesc === ""){
            correctDesc = currDesc;
        }
        const objectToSend = {
            Id: postId, 
            Title: correctName,
            Content: correctDesc
        }

        axios.post("/api/posts/update",objectToSend, config).then(response => {
            console.log(response.data);
            dispatch(editPost(true, []));
            dispatch(fetchEditPost(response.data.successResult));
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(editPost(false, !error.response.data.errors ? 
                array : error.response.data.errors));
            }
        })
    }
}

export const fetchEditPost = editedPost => {
    return {
        type: actionTypes.FETCH_EDIT_POST,
        editedPost: editedPost
    }
}




export const editPostPictureActionCreator = (addedPosts, pictures, editedPost, token) => {
    return dispatch => {
            let formData = new FormData();
            const config = {
                    headers: {'Content-Type': 'multipart/form-data', 
                    'Authorization' : "bearer " + token}
            }; 
            console.log(addedPosts);
            const idsArray = [];
            if(addedPosts.pictures.length > 0){
                idsArray.push(addedPosts.pictures[0].id);
                idsArray.forEach(function (value){
                    formData.append('picsToDeleteIds['+ idsArray.indexOf(value) +']', value);
                });
            }
        
            formData.append("newPictures", pictures);
            formData.append("postId", addedPosts.id);
           
            axios.post("/api/posts/updatepictures", formData, config)
            .then(response => {
                const newObject = editedPost !== null ? {...editedPost} : {...addedPosts};
                console.log(newObject);
                newObject.pictures = pictures;
                dispatch(editPost(true, []));
                dispatch(fetchEditPost(newObject));
            }).catch(error => {
                console.log(error.response);
                    const array = [];
                    array.push("Błąd serwera");
                    dispatch(editPost(false, (error.response.status === 404 || error.response.status === 401 || 
                        error.response.status === 400 )? 
                    array : error.response.data.errors));
            })
            
        
    }
    
}
