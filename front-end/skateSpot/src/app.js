import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Router from './Router';
import reducers from './reducers';
import reduxPromise from 'redux-promise';


class App extends Component {

	render() {
		const store = createStore(reducers, {}, applyMiddleware(reduxPromise))

		return(
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}

}

export default App;