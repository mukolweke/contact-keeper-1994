import React, { Fragment } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'

import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/register'
import Login from './components/auth/login'
import Alerts from './components/layout/Alerts'

if (localStorage.getItem('token')) {
	setAuthToken(localStorage.getItem('token'))
}

const App = () => {
	return (
		<AlertState>
			<AuthState>
				<ContactState>
					<Router>
						<Fragment>
							<Navbar />

							<div className='container'>
								<Alerts />

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
		</AlertState>
	)
}

export default App
