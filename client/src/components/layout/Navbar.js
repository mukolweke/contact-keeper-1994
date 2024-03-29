import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext)
	const contactContext = useContext(ContactContext);

	const { isAuthenticated, logout, user } = authContext
	const { clearContacts } = contactContext;

	const onLogout = () => {
		logout()
		clearContacts()
	}

	const authLinks = (
		<Fragment>
			<li>Hello {user?.name}</li>
			<li>
				<a href='#!' onClick={onLogout}>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</Fragment>
	)

	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/login'>Login</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
		</Fragment>
	)

	return (
		<div className='navbar bg-primary'>
			<h1>
				{' '}
				<i className={icon}></i> {title}
			</h1>

			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	)
}

Navbar.protoTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt',
}

export default Navbar
