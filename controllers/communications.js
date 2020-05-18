const express = require('express');
const router = express.Router();
const Communication = require('../models/Communication');

router.get('/', (req, res) => {
	Communication.find({})
		.then((comms) => res.json(comms))
		.catch((error) => console.log(error));
});
router.get('/:id', (req, res) => {
	Communication.findById({ _id: req.params.id })
		.then((comm) => res.json(comm))
		.catch((error) => console.log(error));
});

router.get('/user/:userid', (req, res) => {
	Communication.find({ user: req.params.userid })
		.then((commlist) => res.json(commlist))
		.catch((error) => console.error);
});

router.post('/', (req, res) => {
	const newTrans = req.body;
	Communication.create(newComm)
		.then((comm) => {
			res.json(comm);
		})
		.catch((error) => console.log(error));
});
router.put('/:id', (req, res) => {
	console.log(req.params._id);
	Communication.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	})
		.then((comm) => res.json(comm))
		.catch((error) => console.log(error));
});
router.delete('/:id', (req, res) => {
	Communication.findByIdAndDelete({ _id: req.params.id })
		.then((comm) => res.json(comm))
		.catch((error) => console.log(error));
});

module.exports = router;
