const express = require('express');
const router = express.Router();
const Communication = require('../models/Communication');
const User = require('../models/User');
const Client = require('../models/Client');
const {
	handleValidateId,
	handleRecordExists,
	handleValidateOwnership,
} = require('../middleware/custom_errors');
const { requireToken } = require('../middleware/auth');

router.get('/', requireToken, (req, res) => {
	Communication.find({})
		.then((comms) => res.json(comms))
		.catch((error) => console.log(error));
});
router.get('/:id', requireToken, (req, res) => {
	Communication.findById({ _id: req.params.id })
		.then((comm) => res.json(comm))
		.catch((error) => console.log(error));
});

//moved this functionality to users.js controller
// router.get('/user/:id', handleValidateId, requireToken, (req, res) => {
// 	Communication.find({ user: req.params.id })
// 		.then((commlist) => res.json(commlist))
// 		.catch((error) => console.error);
// });

router.post('/', requireToken, (req, res) => {
	const newComm = req.body;
	const userId = req.body.user;
	const clientId = req.body.client;

	User.findById(userId)
	.then((user) => {
		Client.findById(clientId)
		.then((client) => {
			Communication.create(newComm)
			.then((comm) => {
				user.communications.push(comm);
				client.communications.push(comm);
				user.save();
				client.save();
				comm.save();
				res.json(comm);
			});
		})
	})
	
		.catch((error) => console.log(error));
});
router.put('/:id', handleValidateId, requireToken, (req, res) => {
	console.log(req.params._id);
	Communication.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	})
		.then((comm) => res.json(comm))
		.catch((error) => console.log(error));
});
router.delete('/:id', handleValidateId, requireToken, (req, res) => {
	Communication.findByIdAndDelete({ _id: req.params.id })
		.then((comm) => res.json(comm))
		.catch((error) => console.log(error));
});

module.exports = router;
