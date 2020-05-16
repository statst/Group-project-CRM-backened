const mongoose = require('../db/connection');

const TransactionSchema = new mongoose.Schema({
	_id: String,
	product: [
		{
			ref: 'Product',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
	price: String,
	date: Date,
	user: [
		{
			ref: 'User',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
	client: [
		{
			ref: 'Client',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
