import React, { Fragment } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContactState from './context/contact/ContactState'

import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'

const App = () => {
	return (
		<ContactState>
			<Router>
				<Fragment>
					<Navbar />

					<div className='container'>
						<Routes>
							<Route exact path='/' element={<Home />}></Route>
							<Route exact path='/about' element={<About />}></Route>
						</Routes>
					</div>
				</Fragment>
			</Router>
		</ContactState>
	)
}

export default App
