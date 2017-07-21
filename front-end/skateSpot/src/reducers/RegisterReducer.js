import { 
	REGISTER_UPDATE,
	REGISTER_USER,
	REGISTER_USER_FAIL,
	REGISTER_USER_SUCCESS
 } from '../actions/types';

 const INITIAL_STATE = {
	userName: '',
	password: '',
	email: '',
	phone: '',
	user: null,
	error: '',
	loading: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case REGISTER_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value }
		case REGISTER_USER:
			return { ...state, loading: true }
		case REGISTER_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload}	
		case REGISTER_USER_FAIL:
			return { ...state, error: 'fail', password: '', loading: false}
		default:
			return state
	}
}