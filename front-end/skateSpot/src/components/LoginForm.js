import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

	render(){
		return(
			<Card>
				<CardSection>
					<Input 
						placeholder='user@gmail.com'
						label='Email'
					/>
				</CardSection>

				<CardSection>
					<Input 
						secureTextEntry
						placeholder='password'
						label="Password"
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>

				</Text>

				<CardSection>
					<Button>
						Log in
					</Button>
				</CardSection>
			</Card>
		)
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red',
	}
}

export default LoginForm














