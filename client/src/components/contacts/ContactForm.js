import React, { useState, useEffect, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'

const initialContact = {
	name: '',
	email: '',
	phone: '',
	type: 'personal',
}

const ContactForm = () => {
	const contactContext = useContext(ContactContext)

	const { addContact, current, clearCurrent, updateContact } = contactContext

	const [contactForm, setContactForm] = useState(initialContact)

	useEffect(() => {
		if (current != null) {
			setContactForm(current)
		} else {
			setContactForm(initialContact)
		}
	}, [contactContext, current])

	const { name, email, phone, type } = contactForm

	const onChange = (e) =>
		setContactForm({ ...contactForm, [e.target.name]: e.target.value })

	const clearAll = () => {
		clearCurrent()
	}

	const onSubmit = (e) => {
		e.preventDefault()

		if (current == null) {
			addContact(contactForm)
		} else {
			updateContact(contactForm)
		}

		clearAll() 
	}

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>
				{current ? 'Edit Contact' : 'Add Contact'}
			</h2>
			<input
				type='text'
				placeholder='Name'
				name='name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='email'
				placeholder='Email'
				name='email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='Phone'
				name='phone'
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<label htmlFor='personal' className='pointer m-1'>
				<input
					id='personal'
					type='radio'
					name='type'
					value='personal'
					checked={type === 'personal'}
					onChange={onChange}
				/>{' '}
				Personal
			</label>
			<label htmlFor='professional' className='pointer m-1'>
				<input
					id='professional'
					type='radio'
					name='type'
					value='professional'
					checked={type === 'professional'}
					onChange={onChange}
				/>{' '}
				Professional
			</label>

			<div>
				<input
					type='submit'
					value={current ? 'Update Contact' : 'Add Contact'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	)
}

export default ContactForm
