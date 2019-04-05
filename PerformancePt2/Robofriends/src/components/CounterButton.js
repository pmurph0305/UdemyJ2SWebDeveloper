import React, { PureComponent } from 'react';

class CounterButton extends PureComponent {

    constructor() {
        super();
        this.state = {
            count: 0,
        }
    }

    // Called before render(). Use cautiously, measure performance before using.
    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.log("NextProps", nextProps);
    //     // console.log("NextState", nextState);
    //     // Even though parent is being re-rendered, this would prevent this component from rerendering.
    //     // Does essentially the same thing as extending PureComponent.
    //     // Except it uses shallow comparison, so it can miss deep nested component updates.
    //     if (this.state.count !== nextState.count) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    updateCount = () => {
        this.setState(state => { 
            return { count: this.state.count + 1 }
        })
    }

    render() {
        console.log("CounterButton");
        return(
            <button color={this.props.color} onClick={this.updateCount}>
                Count: {this.state.count}
            </button>
        );
    }
}

export default CounterButton;