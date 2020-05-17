const mongoose = require('../db/connection');

const ClientSchema = new mongoose.Schema({
	id: String,
	firstname: String,
	lastname: String,
	email: String,
	address: String,
	city: String,
	state: String,
	zip: Number,
	phone: Number,
	communications: [
		{
			ref: 'Communication',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
	transactions: [
		{
			ref: 'Transaction',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
