const express = require('express');
const cors = require('cors');
const usersController = require('./controllers/users');
const clientsController = require('./controllers/clients');
const transactionController = require('./controllers/transactions')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => {
	res.redirect('/api/users');
});
app.use('/api/users', usersController);
app.use('/api/clients', clientsController);
app.use('/api/transactions', transactionController);


app.set('port', process.env.PORT || 8000);

app.listen(8000, () => console.log(`Server is running on port 8000`));
