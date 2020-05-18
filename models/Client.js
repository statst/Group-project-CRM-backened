const mongoose = require('../db/connection');

const ClientSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	address: String,
	city: String,
	state: String,
	zip: Number,
	phone: String,
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
