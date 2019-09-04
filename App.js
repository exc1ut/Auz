import React from 'react';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Navigation from './components/Navigation';
import { View, StatusBar } from 'react-native';

import MainBanner from './components/banner';

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends React.Component {
	state = {
		banner: true
	};

	closeBanner = () => {
		this.setState({
			banner: false
		});
	};

	render() {
		return (
			<Provider store={store}>
				<StatusBar barStyle="dark-content" />
				{this.state.banner ? <MainBanner close={this.closeBanner} /> : <Navigation />}
			</Provider>
		);
	}
}
