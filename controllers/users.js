const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');

const User = require('../models/User');

//route to get all users
router.get('/', (req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((error) => console.log(error));
});

//route to get user by email l
router.get('/:email', (req, res) => {
	User.findOne({ email: req.params.email })
		.then((user) => res.json(user))
		.catch((error) => console.log(error));
});

//route to create new user (create new account)
router.post('/', async (req, res) => {
	try {
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({ email: req.body.email, password });
		res.status(201).json(user);
	} catch (error) {
		return next(error);
	}
});

router.post('/signin', (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token }))
		.catch(next);
});

//route to edit user information
router.put('/:email', (req, res) => {
	User.findOneAndUpdate({ email: req.params.email }, req.body, {
		new: true,
	})
		.then((user) => res.json(user))
		.catch((error) => console.log(error));
});

//route to delete account by email
//find email and delete
router.delete('/:email', (req, res) => {
	User.findOneAndDelete({ email: req.params.email })
		.then((user) => res.json(user))
		.catch((error) => console.log(error));
});
//comment for auth initial push
module.exports = router;
