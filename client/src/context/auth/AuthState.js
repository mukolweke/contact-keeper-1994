import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

import setAuthToken from '../../utils/setAuthToken'

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
		isAuthenticated: false,
		loading: true,
		error: null,
		user: null,
	}

	const [state, dispatch] = useReducer(AuthReducer, initialState)

	// set token on initial app loading
	setAuthToken(state.token)

	// Load User
	const loadUser = async () => {
		try {
			const res = await axios.get('/api/auth')

			dispatch({ type: USER_LOADED, payload: res.data })
		} catch (err) {
			dispatch({ type: AUTH_ERROR })
		}
	}

	// Register User
	const register = async (formData) => {
		// register a user
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		try {
			const res = await axios.post('/api/users', formData, config)
			dispatch({ type: REGISTER_SUCCESS, payload: res.data })
			// loadUser()
		} catch (err) {
			dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg })
		}
	}

	// Login User
	const login = async (formData) => {
		// register a user
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		try {
			const res = await axios.post('/api/auth', formData, config)
			dispatch({ type: LOGIN_SUCCESS, payload: res.data })
			// loadUser()
		} catch (err) {
			dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg })
		}
	}

	// Logout User
	const logout = () => {
		dispatch({ type: LOGOUT })
	}

	// Clear Errors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS })
	}

	// load user on first run or refresh
	if (state.loading) {
		loadUser()
	}

	// 'watch' state.token and set headers and local storage on any change
	useEffect(() => {
		setAuthToken(state.token)
	}, [state.token])

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
