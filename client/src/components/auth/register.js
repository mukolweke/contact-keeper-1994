import React, { useState } from 'react'

const Register = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password_confirm: '',
	})

	const { name, email, password, password_confirm } = user

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('register submit')
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
				<div className='form-group'>
					<label htmlFor='password_confirm'>Password Confirm:</label>
					<input
						type='password'
						name='password_confirm'
						id='password_confirm'
						value={password_confirm}
						onChange={onChange}
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
