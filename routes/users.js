const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
	'/',
	[
		check('name', 'Please add name').notEmpty().escape(),
		check('email', 'Please include a valid email').trim().isEmail().escape(),
		check('password', 'Please enter a password with 6 or more characters')
			.isLength({ min: 6 })
			.escape(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}

			const { name, email, password } = req.body

			let user = await User.findOne({ email })
			if (user) {
				return res.status(400).json({ msg: 'User already exists' })
			}

			user = new User({ name, email, password })
			const salt = await bcrypt.genSalt(10)
			user.password = await bcrypt.hash(password, salt)

			await user.save()

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
