import { shallow } from 'enzyme';
import React from 'react';
import Scroll from './Scroll';



describe('scroll testing', () => {
    let wrapper;
    beforeEach(() => {
        const mockProps = {
            children: {}
        }
        wrapper = shallow(<Scroll {...mockProps}/>)
    }) 
    test('expect to render Scroll Component', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('has correct props', () => {
        expect(wrapper.props().children).toEqual({})
        const mockProps2 = {
            children: {a:1}
        }
        const wrapper2 = shallow(<Scroll {...mockProps2}/>)
        expect(wrapper2.props().children).toEqual({a:1});
    })
})

