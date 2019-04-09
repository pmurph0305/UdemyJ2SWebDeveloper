import { shallow } from 'enzyme';
import React from 'react';
import MainPage from './MainPage';

let wrapper;
beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false,
    }
    wrapper = shallow(<MainPage {...mockProps}/>)
})

it('expects mainpage to render', () => {
    expect(wrapper).toMatchSnapshot();
})

it('isPending works properly', () => {
    const mockPending = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: true,
    }
    let wrapperPending = shallow(<MainPage {...mockPending}/>)
    expect(wrapperPending).toMatchSnapshot();
})

it('filters robots correctly', () => {
    expect(wrapper.instance().filterRobots()).toEqual([]);
    const mockProps2 = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 3,
            name: 'john',
            email: 'john@john',
        }],
        searchField: 'john',
        isPending: false,
    }
    const wrapper2 = shallow(<MainPage {...mockProps2}/>)
    expect(wrapper2.instance().filterRobots()).toEqual([{
        id: 3,
        name: 'john',
        email: 'john@john',
    }]);
})

it('filters robots correctly2', () => {
    expect(wrapper.instance().filterRobots()).toEqual([]);
    const mockProps3 = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 3,
            name: 'john',
            email: 'john@john',
        }],
        searchField: 'a',
        isPending: false,
    }
    const filteredRobots = []
    const wrapper2 = shallow(<MainPage {...mockProps3}/>)
    expect(wrapper2.instance().filterRobots()).toEqual(filteredRobots);
})


// // My own tests written for exercise #3, but wasn't sure how to do actions/reducers with fetch calls.
// import { shallow } from 'enzyme';
// import React from 'react';
// import { AppOriginal, mapDispatchToProps, mapStateToProps } from './AppOriginal'
// import { CHANGE_SEARCH_FIELD } from '../constants';

// describe('Tests for exercise #3 to test a container component.', () => {
//     const mockRobots = [{name:'t'},{name:'b'}]
//     const mockSearchField = '';
//     const mockRequestRobots = jest.fn();
//     it('app renders properly', () => {
//         expect(shallow(<AppOriginal robots={mockRobots} searchField={mockSearchField} onRequestRobots={mockRequestRobots}/>)).toMatchSnapshot();
//     })

//     it ('test isPending works', () => {
//         const isPendingFalse = false;
//         const isPendingTrue = true;
//         expect(shallow(<AppOriginal robots={mockRobots} searchField={mockSearchField} onRequestRobots={mockRequestRobots} isPending={isPendingFalse}/>)).toMatchSnapshot();
//         expect(shallow(<AppOriginal robots={mockRobots} searchField={mockSearchField} onRequestRobots={mockRequestRobots} isPending={isPendingTrue}/>)).toMatchSnapshot();
//     })

//     // Added after the video to properly test robots.
//     it('filters robots correctly', () => {
//         // Test original empty array.
//         const mockProps = {
//             onRequestRobots: jest.fn(),
//             robots: [],
//             searchField:'',
//             error:'',
//             isPending: false,
//         }
//         const wrap = shallow(<AppOriginal {...mockProps}/>)
//         expect(wrap.instance().filterRobots()).toEqual([]);
//         const mockPropsRobots = {
//             onRequestRobots: jest.fn(),
//             robots: [{name: 'john'},{name:'jeff'},{name:'zed'}],
//             searchField:'j',
//             error:'',
//             isPending: false,
//         }
//         const wrap2 = shallow(<AppOriginal {...mockPropsRobots}/>);
//         // test filtering
//         expect(wrap2.instance().filterRobots()).toEqual([{name: 'john'},{name:'jeff'}]);
//     })

//     it('should map state to props correctly', () => {
//         const initialState = {
//             searchRobotsReducer: {
//                 searchField: mockSearchField,
//             },
//             requestRobotsReducer: {
//                 robots: mockRobots,
//                 error: '',
//                 isPending: false,
//             }
//         }
//         expect(mapStateToProps(initialState).searchField).toEqual('');
//         expect(mapStateToProps(initialState).robots).toEqual(mockRobots);
//         expect(mapStateToProps(initialState).error).toEqual('');
//         expect(mapStateToProps(initialState).isPending).toEqual(false);
//     })

//     it('should dispatch search change correctly', () => {
//         const mockEvent = {
//             target: {
//                 value: 'testValue'
//             }
//         }
//         const dispatch = jest.fn();
//         mapDispatchToProps(dispatch).onSearchChange(mockEvent)
//         expect(dispatch).toHaveBeenCalled();
//         expect(dispatch.mock.calls[0][0]).toEqual({ payload: 'testValue', type: CHANGE_SEARCH_FIELD})
//     })

//     it('should dispatch request robots correctly', () => {
//         const dispatch = jest.fn();
//         mapDispatchToProps(dispatch).onRequestRobots();
//         expect(dispatch).toHaveBeenCalled();
//     })
// })

// // In the videos, a MainPage.js component was created and tested instead.
// // It was said doing that was a better way to do it
