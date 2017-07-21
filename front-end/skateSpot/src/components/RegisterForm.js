import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, CardSection, Input, Spinner } from './common'; 

class RegisterForm extends Component {
	render() {
		return(
			<Card>

				<CardSection>
					<Input 
						placeholder='NickSux'
						label='Username'
					/>
				</CardSection>

				<CardSection>
					<Input 
						placeholder='email@gmail.com'
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

				<CardSection>
					<Input 
						placeholder='555-555-5555'
						label='Phone Number'
					/>
				</CardSection>

				<CardSection>
					<Button>
						Register
					</Button>
				</CardSection>

			</Card>
		)
	}
}

export default RegisterForm;