const express = require('express');
const router = express.Router();

const User = require('../models/User');

//route to get all users path in postman /api/users
router.get('/', (req, res) => {
	console.log(User);
	User.find()
		.then((users) => res.json(users))
		.catch((error) => console.log(error));
});

//route to get user by email path in postman /api/users/email
router.get('/:email', (req, res) => {
	User.findOne({ email: req.params.email })
		.then((user) => res.json(user))
		.catch((error) => console.log(error));
});

//route to create new user (create new account)
router.post('/', (req, res) => {
	const newUser = req.body;
	User.create(newUser)
		.then((user) => res.json(user))
		.catch((error) => console.log(error));
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

module.exports = router;
