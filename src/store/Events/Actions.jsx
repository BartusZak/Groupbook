import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';




export const fetchEvents = fetchedEvents => {
    return { 
        type: actionTypes.FETCH_EVENTS,
        fetchedEvents: fetchedEvents
    };
}

export const fetchEventsErrors = fetchedEventsErrors => {
    return {
        type: actionTypes.FETCH_EVENTS_ERRORS,
        fetchedEventsErrors: fetchedEventsErrors
    }
}


export const fetchEventsActionCreator = (lastEventId, groupId) =>{
    return dispatch => {
        axios.get(`/api/events/${groupId}/getafew/${lastEventId}`).then(response => {
            dispatch(fetchEvents(response.data));
        }).catch(error => {
              
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(fetchEventsErrors(error.response.status === 404 ? array : error.response.data.errors));
            }
        })
    }
}




export const fetchOneEvent = fetchedOneEvent => {
    return { 
        type: actionTypes.FETCH_ONE_EVENT,
        fetchedOneEvent: fetchedOneEvent
    };
}

export const fetchOneEventErrors = fetchedOneEventErrors => {
    return {
        type: actionTypes.FETCH_ONE_EVENT_ERROR,
        fetchedOneEventErrors: fetchedOneEventErrors
    }
}

export const fetchOneEventActionCreator = (eventId, token) => {
    return dispatch => {
        axios.get("/api/events/" + eventId).then(response => {
            console.log(response.data);
            dispatch(fetchOneEvent(response.data));
            if(token !== undefined){
                console.log("Siema");
                dispatch(fetchEventsGroupActionCreator(response.data.group.id, token));
            }
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(fetchOneEventErrors(error.response.status === 404 ?
                    array : error.response.data.errors));
            }
        })
    }
}
export const fetchEventsFromGroup = (groupEvents, groupEventsErrors) => {
    return {
        type: actionTypes.FETCH_EVENTS_FROM_GROUP,
        groupEvents: groupEvents,
        groupEventsErrors: groupEventsErrors
    }
}


export const fetchEventsGroupActionCreator = (groupId, token) => {
    return dispatch => {
        if(groupId){
            let config = {
                headers: {'Authorization': "bearer " + token}
            };
            axios.get(`/api/events/groupevents/${groupId}`, config).then(response => {
                dispatch(fetchEventsFromGroup(response.data, []));
            }).catch(error => {
                if(error.response){
                    const array = [];
                    array.push("Błąd serwera");
                    dispatch(fetchEventsFromGroup([], error.response.status === 404 
                        ? array : error.response.data.errors));
                }
            })
        }
        
    }
}



export const redirectToOtherEventActionCreator = (eventId, history) => {
    return dispatch => {
        axios.get("/api/events/" + eventId).then(response => {
            dispatch(fetchOneEvent(response.data));
            history.push("/logged/event/" + eventId);
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(fetchOneEventErrors(error.response.status === 404 ? array : error.response.data.errors));
            }
        })
    }
}


export const addEvent = addEventErrors => {
    return {
        type: actionTypes.ADD_EVENT,
        addEventErrors: addEventErrors
    };
}

export const addEventActionCreator = (pictures, addedGroups, eventTitle,
    eventContent, eventDate, history ) => {

    return dispatch => {

        const groupsIds = addedGroups.map(i => {
            return i.group.id
        })
        const storageItem = JSON.parse(localStorage.getItem('responseObject'));

        const newEvent = {
            Title: eventTitle,
            Description: eventContent,
            EventDate: eventDate,
            GroupsIds: groupsIds,
            UserId: storageItem.id
        }

        axios.post('/api/events/add', newEvent).then(response => {
            if(pictures.length > 0){
               dispatch(addEventPictureActionCreator(pictures[0], history, response.data.successResult.events));
            }
            else{
                history.push({
                    pathname: "/logged/event/" + response.data.successResult.events[0].id,
                    state: {addedEvent: response.data.successResult.events[0]}
                })
            }     

        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(addEvent(error.response.status === 404 ? array :
                    error.response.data.errors));
            }

            
        })
    }
}

export const addEventPictureActionCreator = (picture, history, eventData) => {
    return dispatch => {
        const eventsIds = eventData.map(i => {
            return i.id
        });

        let formData = new FormData();
        
        eventsIds.forEach(function (value){
            formData.append('eventsIds['+ eventsIds.indexOf(value) +']', value);
        });

        formData.append('picture', picture);
        axios({
            method: 'post',
            url: '/api/events/addpicture',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            history.push({
                pathname: "/logged/event/" + response.data.successResult.eventsIds[0],
                state: {addedEvent: eventData[0]}
            })
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(addEvent(error.response.status === 404 
                    ? array : error.response.data.errors));
            }
        })
    }
}




export const addUserToEvent = (addUserToEventResult, addUserToEventErrorList) => {
    return {
        type: actionTypes.ADD_USER_TO_EVENT,
        addUserToEventResult: addUserToEventResult,
        addUserToEventErrorList: addUserToEventErrorList
    }
}

export const addUserToEventActionCreator = (EventId, UserId) => {
    return dispatch => {
        const objectToSend = {
            EventId: EventId,
            UserId: UserId
        }
        axios.post('/api/events/adduser', objectToSend).then(response => {
            dispatch(addUserToEvent(true, []));
            dispatch(fetchOneEventActionCreator(EventId));
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(addUserToEvent(false, error.response.status === 404 
                    ? array : error.response.data.errors));
            }
                
        })
    }
}



export const rejectFromEvent = (rejectResult, rejectErrors) => {
    return {
        type: actionTypes.REJECT_FROM_EVENT,
        rejectResult: rejectResult,
        rejectErrors: rejectErrors
    }
}

export const rejectFromEventActionCreator = (token, eventId) => {
    return dispatch => {
        const config = {
            headers: {'Authorization': "bearer " + token}
        };
        const objectToSend = {
            EventId: eventId
        }
        axios.post(`/api/events/reject`, objectToSend, config).then(response => {
            dispatch(rejectFromEvent(true, []));
            dispatch(fetchOneEventActionCreator(eventId, token));
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(rejectFromEvent(false, error.response.status === 404 
                    ? array : error.response.data.errors));
            }
        })
    }
}

export const deleteEvent = (deleteEventResult, deleteEventErrors) => {
    return {
        type: actionTypes.DELETE_EVENT,
        deleteEventResult: deleteEventResult,
        deleteEventErrors: deleteEventErrors
    }
}

export const deleteEventActionCreator = (token, eventId) => {
    return dispatch => {
        const config = {
            headers: {'Authorization': "bearer " + token}
        };
        axios.delete(`/api/events/${eventId}`, config).then(response => {
            console.log(response.data);
            dispatch(deleteEvent(true, []));
        }).catch(error => {
            console.log(error.response);
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(deleteEvent(false, error.response.status === 404 
                    ? array : error.response.data.errors));
            }
        })
    }
}