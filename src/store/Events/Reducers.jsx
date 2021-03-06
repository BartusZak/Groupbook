import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    addEventErrors: [],

    fetchedOneEvent: {},
    fetchedOneEventErrors: [],


    fetchedEvents: [],
    fetchedEventsErrors: [],

    addUserToEventResult: null,
    addUserToEventErrorList: [],

    groupEvents: [],
    groupEventsErrors: [],

    rejectResult: null,
    rejectErrors: [],

    deleteEventResult: null,
    deleteEventErrors: []

}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_EVENT:
            return updateObject(state, {addEventErrors: action.addEventErrors})

        case actionTypes.FETCH_ONE_EVENT:
            return updateObject(state, {fetchedOneEvent: action.fetchedOneEvent, fetchedOneEventErrors: []})

        case actionTypes.FETCHING_EVENTS_ERRORS:
            return updateObject(state, {fetchedOneEventErrors: action.fetchedOneEventErrors})
        
                
        case actionTypes.FETCH_EVENTS:
            return updateObject(state, {fetchedEvents: action.fetchedEvents, fetchedEventsErrors: []})
        case actionTypes.FETCH_EVENTS_ERRORS:
            return updateObject(state, {fetchedEventsErrors: action.fetchedEventsErrors})
        case actionTypes.ADD_USER_TO_EVENT:
            return updateObject(state, {addUserToEventResult: action.addUserToEventResult,
                addUserToEventErrorList: action.addUserToEventErrorList})
        
        case actionTypes.FETCH_EVENTS_FROM_GROUP:
            return updateObject(state, {groupEvents: action.groupEvents,
                groupEventsErrors: action.groupEventsErrors })
        case actionTypes.REJECT_FROM_EVENT:
            return updateObject(state, { rejectResult: action.rejectResult,
                rejectErrors: action.rejectErrors })
        case actionTypes.DELETE_EVENT:
            return updateObject(state, {deleteEventResult: action.deleteEventResult,
                deleteEventErrors: action.deleteEventErrors })
    }
    return state;   
}
export default reducer;