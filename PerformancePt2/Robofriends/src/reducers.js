import {
    CHANGE_SEARCH_FIELD, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_SUCCESS, REQUEST_ROBOTS_FAILED,
} from './constants'

const initialStateSearch = {
    searchField: '',
}

function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}

export const searchRobotsReducer = (state = initialStateSearch, action = {}) => {
    switch(action.type){
        case CHANGE_SEARCH_FIELD:
            return updateObject(state, { searchField: action.payload })
        default:
            return state;
    }
}

const initialStateRobots = {
    robots: [],
    isPending: false,
    error: '',
}

export const requestRobotsReducer = (state = initialStateRobots, action = {}) => {
    switch(action.type) {
        case REQUEST_ROBOTS_PENDING:
            return updateObject(state, { isPending: true })
        case REQUEST_ROBOTS_SUCCESS:
            return updateObject(state, { robots: action.payload, isPending: false })
        case REQUEST_ROBOTS_FAILED:
            return updateObject(state, { error: action.payload, isPending: false })
        default:
            return state
    }
}