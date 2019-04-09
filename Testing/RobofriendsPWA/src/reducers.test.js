import { shallow } from 'enzyme';

import {
    CHANGE_SEARCH_FIELD, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_SUCCESS, REQUEST_ROBOTS_FAILED,
} from './constants';

import * as reducers from './reducers';

describe('searchRobotsReducer', () => {
    const initialStateSearch = {
        searchField: ''
    }
    it('should return initial state', () => {
        expect(reducers.searchRobotsReducer(undefined, {})).toEqual({searchField: ''})
    })

    it('handle CHANGE_SEARCH_FIELD', () => {
        expect(reducers.searchRobotsReducer(initialStateSearch,
            { type: CHANGE_SEARCH_FIELD, payload: 'test'}
        )).toEqual({searchField: 'test'})
    })
})

describe('requestRobotsReducer', () => {
    const initialStateRobots = {
        robots: [],
        isPending: false,
        error: '',
    }

    it('should return initial state', () => {
        expect(reducers.requestRobotsReducer(undefined, {})).toEqual(initialStateRobots)
    })

    it('should handle REQUEST_ROBOTS_PENDING', () => {
        expect(reducers.requestRobotsReducer(initialStateRobots,
            { type: REQUEST_ROBOTS_PENDING }))
        .toEqual({
            robots:[],
            error: '',
            isPending: true,
        })
    })

    it('should handle REQUEST_ROBOTS_SUCCESS', () => {
        expect(reducers.requestRobotsReducer(initialStateRobots,
            {   type: REQUEST_ROBOTS_SUCCESS,
                payload: [{
                    id: '123',
                    name: 'test',
                    email: 'test@test'
                }]
            }))
            .toEqual({
                robots: [{
                    id: '123',
                    name: 'test',
                    email: 'test@test'
                }],
                error: '',
                isPending: false,
            })
    })

    it('should handle REQUEST_ROBOTS_FAILED', () => {
        expect(reducers.requestRobotsReducer(initialStateRobots,
            {   type: REQUEST_ROBOTS_FAILED,
                payload: 'test error'
            }))
            .toEqual({
                robots: [],
                error: 'test error',
                isPending: false,
            })
    })
})