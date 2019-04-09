import { shallow, mount } from 'enzyme';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

describe("tests for error boundary", () => {

    it('Render ErrorBoundary Component', () => {
        expect(shallow(<ErrorBoundary/>)).toMatchSnapshot();
    })

    it('Component catches correctly', () => {
        const mockError = new Error('test error');
        const ErrorComponent = () => null;
        const wrapper = mount(<ErrorBoundary><ErrorComponent/></ErrorBoundary>);
        wrapper.find(ErrorComponent).simulateError(mockError);
        expect(wrapper.state('hasError')).toEqual(true);
    })
})