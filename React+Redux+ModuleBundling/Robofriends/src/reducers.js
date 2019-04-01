import {
    CHANGE_SEARCH_FIELD,
} from './constants'

const initialState = {
    searchField: ''
}

function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}

export const searchRobotsReducer = (state = initialState, action = {}) => {
    switch(action.type){
        case CHANGE_SEARCH_FIELD:
            return updateObject(state, { searchField: action.payload })
        default:
            return state;
    }
}

