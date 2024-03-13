import React, { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
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

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		error: null,
		user: null,
	}

	const [state, dispatch] = useReducer(AuthReducer, initialState)

	// Load User
	const loadUser = async () => {
		// Implement your logic here to load user data from backend
		// Dispatch USER_LOADED if successful, AUTH_ERROR if failed
	}

	// Register User
	const register = async (formData) => {
		// Implement your logic here to register a user
		// Dispatch REGISTER_SUCCESS if successful, REGISTER_FAIL if failed
	}

	// Login User
	const login = async (formData) => {
		// Implement your logic here to login a user
		// Dispatch LOGIN_SUCCESS if successful, LOGIN_FAIL if failed
	}

	// Logout User
	const logout = () => {
		// Implement your logic here to logout a user
		// Dispatch LOGOUT
	}

	// Clear Errors
	const clearErrors = () => {
		// Dispatch CLEAR_ERRORS
	}

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				loadUser,
				register,
				login,
				logout,
				clearErrors,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState
