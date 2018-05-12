import * as actionTypes from './ActionTypes';
import { updateObject } from '../utility';


const initialState = {
    fetchedSearcherData: [],
    searcherDataErrors: []
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_SEARCHER_DATA:
            return updateObject(state, {fetchedSearcherData: action.fetchedSearcherData,
                searcherDataErrors: action.searcherDataErrors})
       
        
    }
    return state;   
}
export default reducer;