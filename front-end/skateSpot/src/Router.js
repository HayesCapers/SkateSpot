import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class Router extends Component {
	render() {
		return(
			<View>
				<Header headerText='WELCOME' />
				<LoginForm />
			</View>	
		)
	}
}

export default Router