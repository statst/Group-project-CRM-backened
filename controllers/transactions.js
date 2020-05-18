const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', (req, res) => {
	Transaction.find({})
		.then((trans) => res.json(trans))
		.catch((error) => console.log(error));
});
router.get('/:id', (req, res) => {
	Transaction.findById({ _id: req.params.id })
		.then((tran) => res.json(tran))
		.catch((error) => console.log(error));
});

router.get('/user/:userid', (req,res) => {
    Transaction.find({ user: req.params.userid})
    .then((tranlist) => res.json(tranlist))
    .catch((error) => console.error);
})

router.post('/', (req, res) => {
	const newTrans = req.body;
	Transaction.create(newTrans)
		.then((tran) => {
			res.json(tran);
		})
		.catch((error) => console.log(error));
});
router.put('/:id', (req, res) => {
	console.log(req.params._id);
	Transaction.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	})
		.then((tran) => res.json(tran))
		.catch((error) => console.log(error));
});
router.delete('/:id', (req, res) => {
	Transaction.findByIdAndDelete({ _id: req.params.id })
		.then((tran) => res.json(tran))
		.catch((error) => console.log(error));
});

module.exports = router;
