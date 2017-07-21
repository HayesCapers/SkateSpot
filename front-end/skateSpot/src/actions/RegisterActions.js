var axios = require('axios')
import {
	REGISTER_UPDATE,
	REGISTER_USER,
	REGISTER_USER_FAIL,
	REGISTER_USER_SUCCESS
} from './types';


export const registerUpdate = ({ prop, value }) => {
	return {
		type: REGISTER_UPDATE,
		payload: { prop, value }
	}
}

export const registerUser = (user) => {
	return (dispatch) => {
		dispatch({ type: REGISTER_USER })

		const url = 'http://localhost:3000/register'
		axios({
				method: 'post',
				url: url,
				data: user
			}).then(user => {
				if (user.msg === 'regSuccess') {
					registerUserSuccess(dispatch,user)
				} else {
					registerUserFail(dispatch)
				}
			}).catch(() => registerUserFail(dispatch))
	}	
} 

const registerUserFail = (dispatch) => {
	dispatch({
		type: REGISTER_USER_FAIL
	})
}

const registerUserSuccess = (dispatch, user) => {
	dispatch({
		type: REGISTER_USER_SUCCESS,
		payload: user
	});
}