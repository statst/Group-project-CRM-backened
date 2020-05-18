const mongoose = require('../db/connection');

const TransactionSchema = new mongoose.Schema({
	product: String,
	price: Number,
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
