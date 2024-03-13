import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = () => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)
	const { setAlert } = alertContext
	const { register, error, clearErrors, isAuthenticated } = authContext

	const navigate = useNavigate()

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password_confirm: '',
	})

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}

		if (error && error !== '') {
			setAlert(error, 'danger')
			clearErrors()
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated])

	const { name, email, password, password_confirm } = user

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger')
		} else if (password !== password_confirm) {
			setAlert('Passwords do not match', 'danger')
		} else if (!emailPattern.test(email)) {
			setAlert('Please provide a valid email address', 'danger')
		} else {
			register({
				name,
				email,
				password,
			})
		}
	}

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Register</span>
			</h1>

			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name:</label>
					<input
						type='text'
						name='name'
						id='name'
						value={name}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='text'
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
						minLength='6'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password_confirm'>Password Confirm:</label>
					<input
						type='password'
						name='password_confirm'
						id='password_confirm'
						value={password_confirm}
						onChange={onChange}
						minLength='6'
					/>
				</div>

				<div>
					<input
						type='submit'
						value='Register'
						className='btn btn-primary btn-block'
					/>
				</div>
			</form>
		</div>
	)
}

export default Register
