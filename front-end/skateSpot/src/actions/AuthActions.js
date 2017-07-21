var axios = require('axios')
import { 
	USERNAME_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER,
	LOGIN_USER_FAIL
 } from './types';

export const emailChanged = (text) => {
	return {
		type: USERNAME_CHANGED,
		payload: text
	}
}

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload:text
	}
}

export const loginUser = (userName, password) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER })

		const url = 'http://localhost:3000/hayesyoumonster'
		var thePromise = new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url: url,
				data: {
					userName: userName,
					password: password
				}
			})
		})

		thePromise.then(user => {
			if (user.msg === 'Success') {
				loginUserSuccess(dispatch,user)
			} else {
				loginUserFail(dispatch)
			}
		}).catch(() => loginUserFail(dispatch))
	}
	return {
		type: LOGIN_USER_SUCCESS,
		payload: thePromise
	}
}


const loginUserFail = (dispatch) => {
	dispatch({
		type: LOGIN_USER_FAIL
	})
}

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
}