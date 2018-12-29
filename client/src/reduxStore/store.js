import { createStore } from 'redux';


const SEARCH = 'SEARCH';

export function search(query) {
    const result = getSearchResult(query);
    return (
        {
            type: SEARCH,
            result,
        }
    )
}

function getSearchResult(query) {
    // the api here;
    return [];
}

function reducer(state = [], action) {
    switch (action.type) {
        case SEARCH:
            return action.result;
        default: 
            return state;
    }
}

export const store = createStore(reducer);