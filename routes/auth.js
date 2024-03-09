const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')

//@route   GET api/auth
//@desc    Get logged in user
//@access  Private
router.get('/', auth, async (req, res) => {
	try {
		// req.user.id comes from middleware line 14; jwt
		const user = await User.findById(req.user.id).select('-password')
		res.json(user)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

//@route   POST api/auth
//@desc    Auth user & get token
//@access  Public
router.post(
	'/',
	[
		check('email', 'Please include a valid email').trim().isEmail().escape(),
		check('password', 'Please enter a password').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		try {
			let user = await User.findOne({ email })
			if (!user) {
				return res.status(400).json({ msg: 'Invalid user credentials' })
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid password credentials' })
			}

			const payload = {
				user: {
					id: user.id,
				},
			}

			// Get the token
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err
					res.json({ token })
				}
			)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	}
)

module.exports = router
