import React, { Component } from 'react';
import './App.css';

import Page1 from './Components/Page1';
// import Page2 from './Components/Page2';
// import Page3 from './Components/Page3';

import AsyncComponent from './Components/AsyncComponent';

class App extends Component {

	constructor() {
		super();
		this.state = {
			route: 'page1',
			component: null
		}
	}

	onRouteChange = (route) => {
		// No code splitting:
		//this.setState({ route: route })
		
		
		// With 1st code splitting:
		// if (route === 'page1') {
		// 	this.setState({ route: route });
		// } else if (route === 'page2') {
		// 	import('./Components/Page2').then((Page2) => {
		// 		this.setState({ route: route, component: Page2.default })
		// 	})
		// } else {
		// 	import('./Components/Page3').then((Page3) => {
		// 		this.setState({ route: route, component: Page3.default })
		// 	})
		// }

		// with async component:
		this.setState({ route: route})
	}

	render() {
		// Very basic routing.
		// if (this.state.route === 'page1') {
		//   return <Page1 onRouteChange={this.onRouteChange}/>
		// } else if (this.state.route === 'page2') {
		//   return <Page2 onRouteChange={this.onRouteChange}/>
		// } else {
		//   return <Page3 onRouteChange={this.onRouteChange}/>
		// }

		// 1st code splitting
		// if (this.state.route === 'page1') {
		// 	return <Page1 onRouteChange={this.onRouteChange} />
		// } else {
		// 	return <this.state.component onRouteChange={this.onRouteChange} />
		// }

		// with AsyncComponent
		if (this.state.route === 'page1') {
			return <Page1 onRouteChange={this.onRouteChange} />
		} else if (this.state.route === 'page2') {
			const AsyncPage2 = AsyncComponent(() => import('./Components/Page2'))
			return <AsyncPage2 onRouteChange={this.onRouteChange} />
		} else {
			const AsyncPage3 = AsyncComponent(() => import('./Components/Page3'))
			return <AsyncPage3 onRouteChange={this.onRouteChange} />
		}
	}
}

export default App;
