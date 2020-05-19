const express = require('express');
const cors = require('cors');
const usersController = require('./controllers/users');
const clientsController = require('./controllers/clients');
const transactionController = require('./controllers/transactions');
const communicationsController = require('./controllers/communications');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => {
	res.send('connected');
});
app.use('/api/users', usersController);
app.use('/api/clients', clientsController);
app.use('/api/transactions', transactionController);
app.use('/api/communications', communicationsController);
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).send(message);
});

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
