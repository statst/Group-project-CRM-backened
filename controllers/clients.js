const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

const { handleRecordExists } = require('../middleware/custom_errors');
const { requireToken } = require('../middleware/auth');

//route to get all clients info
router.get('/', requireToken, (req, res) => {
	Client.find({})
		.then((clients) => res.json(clients))
		.catch((error) => console.log(error));
});
//route to get clients by email
router.get('/:email', requireToken, (req, res) => {
	Client.findOne({ email: req.params.email })
		.then(handleRecordExists)
		.then((client) => res.json(client))
		.catch((error) => console.log(error));
});

//route to create new client
router.post('/', requireToken, (req, res) => {
	const newClient = req.body;
	Client.create(newClient)
		.then((client) => {
			res.json(client);
		})
		.catch((error) => console.log(error));
});

//route to edit client information
//search for email and edit
router.put('/:email', requireToken, (req, res) => {
	Client.findOneAndUpdate({ email: req.params.email }, req.body, { new: true })
		.then((client) => res.json(client))
		.catch((error) => console.log(error));
});

//route to delete client
//find client by email and delete
router.delete('/:email',requireToken (req, res) => {
	Client.findOneAndDelete({ email: req.params.email })
		.then(handleRecordExists)
		.then((client) => res.json())
		.catch((error) => console.log(error));
});
module.exports = router;
