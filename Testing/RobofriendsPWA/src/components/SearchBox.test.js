import { shallow } from 'enzyme';
import React from 'react';
import SearchBox from './SearchBox';

it('expect to render SearchBox Component', () => {
    expect(shallow(<SearchBox/>)).toMatchSnapshot();
})