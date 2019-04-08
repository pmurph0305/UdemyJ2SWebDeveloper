import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
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

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render() {
		const { isPending, robots, searchField, onSearchChange } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return (
				<div className='tc'>
					<Header/>
					<SearchBox searchChange={onSearchChange} />
					<Scroll>
					{ isPending ? <h1>Loading...</h1> :
						<ErrorBoundary>
							<CardList robots={filteredRobots} />
						</ErrorBoundary>
					}
					</Scroll>
				</div>
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);