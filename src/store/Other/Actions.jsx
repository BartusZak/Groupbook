import * as actionTypes from './ActionTypes';
import axios from 'axios/axios-groupsconnects';

export const fetchSearcherData = (fetchedSearcherData, searcherDataErrors) => {
    return {
        type: actionTypes.FETCH_SEARCHER_DATA,
        fetchedSearcherData: fetchedSearcherData,
        searcherDataErrors: searcherDataErrors
    };
}

export const fetchSearcherDataActionCreator = token => {
    return dispatch => {
        const config = {
            headers: {'Authorization': "bearer " + token}
        };
        axios.get("/api/account/getsearchdata", config).then(response => {
            dispatch(fetchSearcherData(response.data, []));
        }).catch(error => {
            if(error.response){
                const array = [];
                array.push("Błąd serwera");
                dispatch(fetchSearcherData([], error.response.status === 404 ? 
                array : error.response.data.errors));
            }
          
        })
    }
}