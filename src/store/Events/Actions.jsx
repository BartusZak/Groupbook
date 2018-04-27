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

export const fetchOneEventActionCreator = eventId => {
    return dispatch => {
        axios.get("/api/events/ " + eventId).then(response => {
            dispatch(fetchOneEvent(response.data));
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
            Desciption: eventContent,
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
                dispatch(addEvent(error.response.status === 404 ? array : error.response.data.errors));
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


