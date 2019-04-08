import { shallow } from 'enzyme';
import React from 'react';
import CardList from './CardList';

it('expect to render CardList Component', () => {
    const mockRobots = [
        {
            id: 1,
            name: 'Test Name',
            username: 'TestUser',
            email: 'test@test.test'
        }
    ]
    expect(shallow(<CardList robots={mockRobots}/>)).toMatchSnapshot();
})