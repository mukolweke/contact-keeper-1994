import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
} from '../types'

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'John Doe',
				email: 'johndoe@gmail.com',
				phone: '1111-1111-2212',
				type: 'personal',
			},
			{
				id: 2,
				name: 'Sarah Conor',
				email: 'sarahconor@gmail.com',
				phone: '2222-1111-2212',
				type: 'personal',
			},
			{
				id: 3,
				name: 'Srinath Maribe',
				email: 'sridudi@gmail.com',
				phone: '4212-5433-2212',
				type: 'professional',
			},
		],
		current: null, // current editable contact
		filtered: null, // filtered contacts
	}

	const [state, dispatch] = useReducer(contactReducer, initialState)

	// Add Contact
	const addContact = (contactForm) => {
		contactForm.id = uuidv4()

		dispatch({ type: ADD_CONTACT, payload: contactForm })
	}

	// Delete Contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id })
	}

	// Set Current Contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact })
	}

	// Clear Current Contact
	const clearCurrent = () => {
		dispatch({ type: SET_CURRENT })
	}

	// Update Contact
	const updateContact = (contact) => {
		dispatch({ type: UPDATE_CONTACT, payload: contact })
	}

	// Filter Contacts
	const filterContacts = (search) => {
		dispatch({ type: FILTER_CONTACTS, payload: search })
	}

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER })
	}

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	)
}

export default ContactState
