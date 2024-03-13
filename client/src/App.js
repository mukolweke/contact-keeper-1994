import React, { Fragment } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'

import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/register'
import Login from './components/auth/login'

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<Router>
					<Fragment>
						<Navbar />

						<div className='container'>
							<Routes>
								<Route exact path='/' element={<Home />}></Route>
								<Route exact path='/about' element={<About />}></Route>
								<Route exact path='/login' element={<Login />}></Route>
								<Route exact path='/register' element={<Register />}></Route>
							</Routes>
						</div>
					</Fragment>
				</Router>
			</ContactState>
		</AuthState>
	)
}

export default App
