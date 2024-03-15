import React, { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = () => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)
	const { setAlert } = alertContext
	const { login, error, clearErrors, isAuthenticated } = authContext

	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		if (error && error !== '') {
			setAlert(error, 'danger')
			clearErrors()
		}
		// eslint-disable-next-line
	}, [error])

	const { email, password } = user

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (email === '' || password === '') {
			setAlert('Please enter all fields', 'danger')
		} else if (!emailPattern.test(email)) {
			setAlert('Please provide a valid email address', 'danger')
		} else {
			login({
				email,
				password,
			})
		}
	}

	if (isAuthenticated) return <Navigate to='/' />

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Login</span>
			</h1>

			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						name='email'
						id='email'
						value={email}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={onChange}
					/>
				</div>

				<div>
					<input
						type='submit'
						value='Login'
						className='btn btn-primary btn-block'
					/>
				</div>
			</form>
		</div>
	)
}

export default Login
