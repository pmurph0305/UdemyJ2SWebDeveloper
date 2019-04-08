import { shallow } from 'enzyme';
import React from 'react';
import CounterButton from './CounterButton';

describe('My own coverage tests from Exercise #2', () => {
// The following is from the exercise to get the count button up to 100% code coverage.
    it('expect to render CounterButton Component', () => {
        expect(shallow(<CounterButton />)).toMatchSnapshot();
    })

    // testing state by simulating a click.
    it('simulate click events on Counter Button', () => {
        const wrapper = shallow(<CounterButton/>);
        wrapper.find('button').simulate('click');
        expect(wrapper.state('count')).toEqual(1);
    })

    // After seeing course was using older non-extend PureComponent but regular component with shouldComponentUpdate
    // I made these changes and branch coverage % dropped to 50% coverage.
    // So I paused video, and created the changes to regular Component and covered the branch differences.
    it('test should component update on Counter Button', () => {
        const wrapper = shallow(<CounterButton/>);
        const shouldCompUpdateFalse = wrapper.instance().shouldComponentUpdate(null, { count: 0 })
        expect(shouldCompUpdateFalse).toBe(false);
        const shouldCompUpdateTrue = wrapper.instance().shouldComponentUpdate(null, { count: 1 })
        expect(shouldCompUpdateTrue).toBe(true);
    })
})

describe('Examples from the course videos', () => {
    // Tests from the video.
    it('Course expect to render CounterButton Component', () => {
        const mockColor = 'red'
        expect(shallow(<CounterButton color={mockColor}/>)).toMatchSnapshot();
    })

    it('Course correctly increments counter', () => {
        const mockColor = 'red';
        const wrapper = shallow(<CounterButton color={mockColor}/>);
        wrapper.find('[id="counter"]').simulate('click');
        wrapper.find('[id="counter"]').simulate('click');
        expect(wrapper.state()).toEqual({ count: 2})
        wrapper.find('[id="counter"]').simulate('click');
        expect(wrapper.state()).toEqual({ count: 3})
        wrapper.find('[id="counter"]').simulate('keypress');
        expect(wrapper.state()).toEqual({ count: 3})
        expect(wrapper.props().color).toEqual('red')
    })
})