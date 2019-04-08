import { shallow } from 'enzyme';
import React from 'react';
import Card from './Card';

it('expect to render Card Component', () => {
    //expect(shallow(<Card />).length).toEqual(1);
    // using snapshot testing
    expect(shallow(<Card />)).toMatchSnapshot();
})