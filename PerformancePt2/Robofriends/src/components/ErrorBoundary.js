import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <h1>Error.</h1>
        }
        // Children will be the things between error boundary. Ie the cardlist.
        return this.props.children;
    }
}

export default ErrorBoundary;
