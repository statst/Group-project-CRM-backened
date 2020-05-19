const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User')
const Client = require('../models/Client')
const {
	handleValidateId,
	handleRecordExists,
} = require('../middleware/custom_errors');
const { requireToken } = require('../middleware/auth');

router.get('/', requireToken, (req, res) => {
	Transaction.find({})
		.then((trans) => res.json(trans))
		.catch((error) => console.log(error));
});

//moved this functionality to users.js controller
// router.get('/user/:userid', handleValidateId, requireToken, (req, res) => {
// 	Transaction.find({ user: req.params.userid })
// 		.then((tranlist) => res.json(tranlist))
// 		.catch((error) => console.error);
// });

router.get('/:id', requireToken, (req, res) => {
	Transaction.findById({ _id: req.params.id })
		.then((tran) => res.json(tran))
		.catch((error) => console.log(error));
});

router.post('/', requireToken, (req, res) => {
	const newTrans = req.body;
	const userId = req.body.user;
	const clientId = req.body.client;

	User.findById(userId)
	.then((user) => {
		Client.findById(clientId)
		.then((client) => {
			Transaction.create(newTrans)
			.then((tran) => {
				user.transactions.push(tran);
				client.transactions.push(tran);
				user.save();
				client.save();
				tran.save();
				res.json(tran);
			})
		})
	}).catch((error) => console.log(error));
});
router.put('/:id', handleValidateId, requireToken, (req, res) => {
	console.log(req.params._id);
	Transaction.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	})
		.then((tran) => res.json(tran))
		.catch((error) => console.log(error));
});
router.delete('/:id', handleValidateId, requireToken, (req, res) => {
	Transaction.findByIdAndDelete({ _id: req.params.id })
		.then((tran) => res.json(tran))
		.catch((error) => console.log(error));
});

module.exports = router;
