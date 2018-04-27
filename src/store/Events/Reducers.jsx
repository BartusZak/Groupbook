import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    addEventErrors: [],

    fetchedOneEvent: {},
    fetchedOneEventErrors: [],


    fetchedEvents: [],
    fetchedEventsErrors: []
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

       
    }
    return state;   
}
export default reducer;