const express = require('express');
const router = express.Router();
const Communication = require('../models/Communication');
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

router.get('/user/:id', handleValidateId, requireToken, (req, res) => {
	Communication.find({ user: req.params.id })
		.then((commlist) => res.json(commlist))
		.catch((error) => console.error);
});

router.post('/', requireToken, (req, res) => {
	const newTrans = req.body;
	Communication.create(newComm)
		.then((comm) => {
			res.json(comm);
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
