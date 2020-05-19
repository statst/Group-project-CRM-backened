const User = require('../models/User');
const Client = require('../models/Client');
const Communication = require('../models/Communication');
const Transaction = require('../models/Transaction');
// const Product = require('../models/Product');

const usersData = require('./usersSeed.json');
const clientsData = require('./clientsSeed.json');

// const productsData = require('./productSeed.json');

//clear users collection and insert user data into collection
User.deleteMany({}).then(() => {
	console.log('delete all users');
	return User.collection.insertMany(usersData);
});

//clear client collection and insert client data into collection
Client.deleteMany({}).then(() => {
	console.log('delete all clients');
	return Client.collection.insertMany(clientsData);
});

//clear communication collection and insert communications data into user and client
Communication.deleteMany({}).then(() => {
	User.findOne({ email: 'rdellis1@gmail.com' }).then((user) => {
		Client.findOne({ email: 'JoeP@gmail.com' }).then((client) => {
			Communication.create({
				subject: 'subject1',
				body: 'Body of Communication1',
				date: new Date(),
			}).then((comm) => {
				user.communications.push(comm);
				client.communications.push(comm);
				comm.user.push(user);
				comm.client.push(client);
				comm.save();
				console.log('first communication created');
			})
			Communication.create({
				subject: 'subject2',
				body: 'Body of Communication3',
				date: new Date(),
			}).then((comm) => {
				user.communications.push(comm);
				client.communications.push(comm);
				comm.user.push(user);
				comm.client.push(client);
				comm.save();
			})
			Communication.create({
				subject: 'subject3',
				body: 'Body of Communication3',
				date: new Date(),
			}).then((comm) => {
				user.communications.push(comm);
				client.communications.push(comm);
				comm.user.push(user);
				comm.client.push(client);
				comm.save();
				console.log('third communication created');
			});
			//clear transaction collection and insert transaction data into user and client
			Transaction.deleteMany({});
			Transaction.create({
				product: 'product1',
				price: 37.50,
				date: new Date(),
			}).then((tran) => {
				user.transactions.push(tran);
				client.transactions.push(tran);
				tran.user.push(user);
				tran.client.push(client);
				tran.save();
				console.log('first transaction created');
				});
				Transaction.create({
					product: 'product2',
					price: 90.5,
					date: new Date(),
				}).then((tran) => {
				user.transactions.push(tran);
				client.transactions.push(tran);
				tran.user.push(user);
				tran.client.push(client);
				tran.save();
				console.log('second transaction created');
			});
			Transaction.create({
				product: 'product3',
				price: 12.5,
				date: new Date(),
			}).then((tran) => {
				user.transactions.push(tran);
				user.save();
				client.transactions.push(tran);
				client.save();
				tran.user.push(user);
				tran.client.push(client);
				tran.save();
				console.log('third transaction created');
			});
		});
	});
});


//clear transaction collection and insert transactions data into user and client
// Transaction.deleteMany({}).then(() => {
// 	User.findOne({ email: 'rdellis1@gmail.com' }).then((user) => {
// 		Client.findOne({ email: 'JoeP@gmail.com' }).then((client) => {
// 			Transaction.create({
// 				product: 'product1',
// 				price: 37.50,
// 				date: new Date(),
// 			}).then((tran) => {
// 				user.transactions.push(tran);
// 				client.transactions.push(tran);
// 				tran.user.push(user);
// 				tran.client.push(client);
// 				tran.save();
// 				console.log('first transaction created');
// 			});
// 		});
// 	});
// 	User.findOne({ email: 'rdellis1@gmail.com' }).then((user) => {
// 		Client.findOne({ email: 'SteveJ@gmail.com' }).then((client) => {
// 			Transaction.create({
// 				product: 'product2',
// 				price: 90.5,
// 				date: new Date(),
// 			}).then((tran) => {
// 				user.transactions.push(tran);
// 				client.transactions.push(tran);
// 				tran.user.push(user);
// 				tran.client.push(client);
// 				tran.save();
// 				console.log('second transaction created');
// 			});
// 		});
// 	});
// 	User.findOne({ email: 'rdellis1@gmail.com' }).then((user) => {
// 		Client.findOne({ email: 'JoeP@gmail.com' }).then((client) => {
// 			Transaction.create({
// 				product: 'product3',
// 				price: 12.5,
// 				date: new Date(),
// 			}).then((tran) => {
// 				user.transactions.push(tran);
// 				user.save();
// 				client.transactions.push(tran);
// 				client.save();
// 				tran.user.push(user);
// 				tran.client.push(client);
// 				tran.save();
// 				console.log('third transaction created');
// 			});
// 		});
// 	});
// });

//clear product collection and insert product data into collection
// Product.deleteMany({})
// 	.then(() => {
// 		console.log('delete all products');
// 		return Product.collection.insertMany(productsData);
// 	})
// 	.then(() => {
// 		process.exit;
// 	})
