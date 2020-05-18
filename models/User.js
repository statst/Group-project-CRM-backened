const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
	firstname: {
		type: String,
		require: true,
	},
	lastname: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
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
},
{
	timestamps: true,
	id: false,
	toJSON: {
		virtuals: true,
		transform: (_doc, ret) => {
			delete ret.password;
			return ret;
		}
	}
}
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
