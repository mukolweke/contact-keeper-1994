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

import PrivateRoute from './components/routing/privateRoute'

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
									<Route path='/' element={<PrivateRoute component={Home} />} />
									<Route path='/about' element={<PrivateRoute component={About} />} />
									<Route path='/login' element={<Login />} />
									<Route path='/register' element={<Register />} />
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
