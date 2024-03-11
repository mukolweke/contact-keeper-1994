import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contacts = () => {
	const contactContext = useContext(ContactContext)

	const { contacts, filtered } = contactContext

	if (contacts !== null && contacts.length === 0) {
		return <h4>Please add a contact</h4>
	}

	return (
		<Fragment>
			{contacts !== null ? (
				<TransitionGroup>
					{(filtered ?? contacts).map((contact) => (
						<CSSTransition key={contact.id} timeout={500} classNames='item'>
							<ContactItem contact={contact} />
						</CSSTransition>
					))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	)
}

export default Contacts