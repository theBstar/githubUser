import { createStore } from 'redux';
const axios = require('axios');

const SEARCHING = 'SEARCHING';
const SEARCHCOMPLETED = 'SEARCHCOMPLETED';
const defaultState = {
    users: [],
    isSearching: false,
};

export function search(query) {
    getSearchResult(query);
    return ({
        type: SEARCHING,
        payload: {
            users: [],
            isSearching: true,
        } 
    })
}

function searchCompleted(result) {
    return ({
        type: SEARCHCOMPLETED,
        payload: {
            users: result,
            isSearching: false,
        }
    })
}

function getSearchResult(query) {
    // the api here;
    console.log('hello from getSearchResult query', query);
    let result = []; 
    if (!query.trim().length) {
        console.log('dispatching ', result)
        setTimeout(()=> {
            store.dispatch(searchCompleted(result));
        }, 0)
        
        return;
    }
    axios.get(`https://api.github.com/search/users?q=${query}&per_page=10`)
        .then((response)=> {
        console.log(response.data.items);
        result = response.data.items
        store.dispatch(searchCompleted(result));
        return;
    })
    .catch(function (error) {
        console.log(error)
        store.dispatch(searchCompleted([]));
    });
}

function reducer(state = defaultState, action) {
    switch (action.type) {
        case SEARCHING: 
            return action.payload;
        case SEARCHCOMPLETED:
            console.log('result from reducer ', action.payload)
            return action.payload;
        default: 
            return state;
    }
}

export const store = createStore(reducer);