import * as actions from './actions'
import { CHANGE_SEARCH_FIELD, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_SUCCESS, REQUEST_ROBOTS_FAILED } from './constants';

import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import fetchMock from 'fetch-mock';

const mockStore = configureStore([thunkMiddleware]);

describe('setSearchField', () => {
    it('should create an action to change search field', () => {
        const text = 'test search'
        const expectedAction = {
            type: CHANGE_SEARCH_FIELD,
            payload: text
        }
        expect(actions.setSearchField(text)).toEqual(expectedAction);
    })
})

describe('requestRobots', () => {
    afterEach(() => {
        fetchMock.restore()
      })
    it('handles requesting robots API', () => {
        const store = mockStore();
        store.dispatch(actions.requestRobots())
        const action = store.getActions();
        console.log('action', action);
        const expectedAction = {
            type: REQUEST_ROBOTS_PENDING,
        }
        expect(action[0]).toEqual(expectedAction);
    })

    it('handles request robots success fetch', () => {
        fetchMock.getOnce('https://jsonplaceholder.typicode.com/users', {
            body: { users: ['test user'] },
            headers: { 'content-type':'application/json'}
        })

        const expectedActions = [
            { type: REQUEST_ROBOTS_PENDING },
            { type: REQUEST_ROBOTS_SUCCESS, payload: { users: ['test user'] } }
        ]
        const store = mockStore();
        return store.dispatch(actions.requestRobots()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('handles request robot fail fetch', () => {
        fetchMock.mock('https://jsonplaceholder.typicode.com/users', 400);

        const expectedActions = [
            { type: REQUEST_ROBOTS_PENDING },
            { type: REQUEST_ROBOTS_FAILED, payload: new Error("Invalid JSON") }
        ]
        const store = mockStore();
        return store.dispatch(actions.requestRobots()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})