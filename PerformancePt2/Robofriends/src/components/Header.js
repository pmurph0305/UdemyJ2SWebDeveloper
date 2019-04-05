import React, { Component } from 'react';
import CounterButton from './CounterButton';

class Header extends Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return false;
    // }

    render() {
        console.log("header");
        return(
                <>   
                    <h1 className='f1'>RoboFriends</h1>
                    <CounterButton color={'red'}/>
                </>
        )
    }
}

export default Header;