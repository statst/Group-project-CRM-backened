const User = require('../models/User');
const Client = require('../models/Client');
const Communication = require('../models/Communication');
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

const usersData = require('./usersSeed.json');
const clientsData = require('./clientsSeed.json');
const communicationsData = require('./communicationsSeed.json');
const transactionsData = require('./transactionsSeed.json');
const productsData = require('./productSeed.json');

User.deleteMany({}).then(() => {
	console.log('delete all users');
	return User.collection.insertMany(usersData);
});
// Client.deleteMany({}).then(() => {
// 	console.log('delete all clients');
// 	return Client.collection.insertMany(clientsData);
// });
// Communication.deleteMany({}).then(() => {
// 	console.log('delete all communications');
// 	return Communication.collection.insertMany(communicationsData);
// });
// Transaction.deleteMany({}).then(() => {
// 	console.log('delete all transactions');
// 	return Transaction.collection.insertMany(transactionsData);
// });
// Product.deleteMany({})
// 	.then(() => {
// 		console.log('delete all products');
// 		return Product.collection.insertMany(productsData);
// 	})
// 	.then(() => {
// 		process.exit;
// 	});
