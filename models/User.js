const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
	_id: String,
	firstname: String,
	lastname: String,
	email: String,
	password: String,
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
