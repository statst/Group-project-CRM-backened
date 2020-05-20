const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');
const { requireToken } = require('../middleware/auth');

const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Communication = require('../models/Communication');

//route to get all users
router.get('/', requireToken, (req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((error) => console.log(error));
});

//route to get user by email l
router.get('/:email', requireToken, (req, res) => {
	User.findOne({ email: req.params.email })
		.then((user) => res.json(user))
		.catch((error) => console.log(error));
});

//route to get transactions by user
router.get('/:email/transactions', requireToken, (req, res) => {
	User.findOne({ email: req.params.email })
		.then((user) => {
				Transaction.find({ _id: { $in: user.transactions } })
				.then((tranList) => res.json(tranList))
		})
		.catch((error) => console.log(error));
})

//route to get communications by user
router.get('/:email/communications', requireToken, (req, res) => {
	User.findOne({ email: req.params.email })
		.then((user) => {
				Communication.find({ _id: { $in: user.communications } })
				.then((commList) => res.json(commList))
		})
		.catch((error) => console.log(error));
})

//route to create new user (create new account)
router.post('/', async (req, res, next) => {
	try {
		console.log('req.body:', req.body);
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password });
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
router.put('/:email', requireToken, (req, res) => {
	User.findOneAndUpdate({ email: req.params.email }, req.body, {
		new: true,
	})
		.then((user) => res.json(user))
		.catch((error) => console.log(error));
});

//route to delete account by email
//find email and delete
router.delete('/:email', requireToken, (req, res) => {
	User.findOneAndDelete({ email: req.params.email })
		.then((user) => res.json(user))
		.catch((error) => console.log(error));
});
//comment for auth initial push
module.exports = router;
