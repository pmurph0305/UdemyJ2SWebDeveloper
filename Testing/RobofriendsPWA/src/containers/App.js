import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainPage from '../components/MainPage';
import './App.css';

import { setSearchField, requestRobots } from '../actions'

 const mapStateToProps = state => ({
	searchField: state.searchRobotsReducer.searchField,

	robots: state.requestRobotsReducer.robots,
	error: state.requestRobotsReducer.error,
	isPending: state.requestRobotsReducer.isPending,
})

 const mapDispatchToProps = (dispatch) => {
	return { 
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots()),
	}
}

class App extends Component {
	render() {
		return <MainPage {...this.props}/>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);