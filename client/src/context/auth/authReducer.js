import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types'

const authReducer = (state, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token)

			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
		case REGISTER_FAIL:
			localStorage.removeItem('token')

			return {
				...state,
				isAuthenticated: false,
				loading: false,
				token: null,
				user: null,
				error: action.payload,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			}
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		default:
			return state
	}
}

export default authReducer
