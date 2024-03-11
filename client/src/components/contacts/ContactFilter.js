import React, { useContext, useEffect, useRef } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
	const contactContext = useContext(ContactContext)

	const { filterContacts, clearFilter, filtered } = contactContext

	const search = useRef('')

	const onChange = (ev) => {
		if (search.current.value !== '') {
			filterContacts(ev.target.value)
		} else {
			clearFilter()
		}
	}

	useEffect(() => {
		if (filtered == null) {
			search.current.value = ''
		}
	}, [filtered])

	return (
		<form>
			<input
				type='text'
				ref={search}
				placeholder='Filter Contacts...'
                onChange={onChange}
                autoComplete='off'
			/>
		</form>
	)
}

export default ContactFilter
