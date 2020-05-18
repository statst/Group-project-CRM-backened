const mongoose = require('../db/connection');

const CommunicationSchema = new mongoose.Schema({
	subject: String,
	body: String,
	date: Date,
	user: [{ ref: 'User', type: mongoose.Schema.Types.ObjectId }],
	client: [
		{
			ref: 'Client',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
});

const Communication = mongoose.model('Communication', CommunicationSchema);

module.exports = Communication;
