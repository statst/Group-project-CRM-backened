const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('https://glacial-sands-49555.herokuapp.com/api');
const index = require('../index');

//TEST ROUTES FOR USERS

// test to make sure the 401 error show up if not signin
describe('GET /users/signin', () => {
	it('should return a 401 status', (done) => {
		api
			.get('/users/signin')
			.set('Accept', 'application/json')
			.expect(401, done);
	});
});

//create a token variable
let token;
//declare userCredential
const userCredentials = {
	email: 'tkthedesigner@gmail.com',
	password: 'password2',
};
describe('POST /users/signin', () => {
	//before test any route, sign in and save token
	before((done) => {
		api
			.post('/users/signin')
			.set('Accept', 'application/json')
			.send(userCredentials)
			.end((err, response) => {
				token = response.body.token;
				done();
			});
	});
	//after signed in, it should return 200 response
	it('should return a 200 status', (done) => {
		api
			.post('/users/signin')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.then((response) => {
				expect(200, done());
			});
	});
});

//test route for getting all users' data back with saved token passed in
describe('GET /users', () => {
	it('should get all the user data back', (done) => {
		api
			.get('/users')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

//test route for getting one user back using email
describe('GET /users/:email', () => {
	it('should return an object with valid fields of name and email', (done) => {
		api
			.get(`/users/${userCredentials.email}`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				expect(response.body).to.include.all.keys(
					'firstname',
					'lastname',
					'email'
				);
				done();
			});
	});
});

//test route for edit user and return new updated user
describe('PUT /users/:email', () => {
	const userToUpdate = {
		email: 'tkthedesigner@gmail.com',
		lastname: 'new-yen',
	};
	before((done) => {
		api
			.put(`/users/${userToUpdate.email}`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send(userToUpdate)
			.end(done);
	});
	it('should return an user with update last name', (done) => {
		api
			.get(`/users/${userToUpdate.email}`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {

				expect(response.body).to.have.property('lastname', 'new-yen');
				done();
			});
	});
});

//test route for creating new user and find it in database
describe('POST /users', () => {
	const newTestUser = {
		firstname: 'test',
		lastname: 'user',
		email: 'testUser2@gmail.com',
		password: 'test123',
	};
	before((done) => {
		api.post('/users').set('Accept', 'application/json').send(newTestUser).end(done);
	});
	it('should return collection of user with new created user', (done) => {
		api
			.get('/users')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {

				const userToFind = response.body.find(
					(user) => user.id === newTestUser.id
				);
				expect(userToFind).to.be.an('object');
				done();
			});
	});
});

//test route for deleting new created user using email and return the original database
describe('DELETE /users/:email', () => {
	let userToDelete;
	before((done) => {
		api
			.get('/users')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				const users = response.body;
				userToDelete = users[users.length - 1].email;
				done();
			});
	});
	before((done) => {
		api
			.delete(`/users/${userToDelete}`)
			.set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .end(done)
	});
	it('should delete the last created user', (done) => {
		api
			.get('/users')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {

				const deletedUser = response.body.find(
					(user) => user.id === userToDelete
				);
				expect(deletedUser).to.equal(undefined);
				done();
			});
	});
});

//test route for accessing communications data associated with signed-in user
describe('GET /users/:email/communications', () => {
	it('should return an array of communications detail associated with user', (done) => {
		api
			.get(`/users/${userCredentials.email}/communications`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

//test route for accessing transactions data associated with signed-in user
describe('GET /users/:email/transactions', () => {
	it('should return an array of transactions detail associated with user', (done) => {
		api
			.get(`/users/${userCredentials.email}/transactions`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

//TEST ROUTES FOR CLIENTS
//declare variable for client info
const clientInfo = {
	email: 'SteveJ@gmail.com',
};
//test route for accessing all clients data associated with signed-in user
describe('GET /clients', () => {
	it('should return an array of clients associated with user', (done) => {
		api
			.get(`/clients`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				console.log(response.body);
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

//test route for accessing client by email associated with signed-in user
describe('GET /clients/:email', () => {
	it('should return a client with field included firstname,lastname', (done) => {
		api
			.get(`/clients/${clientInfo.email}`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				expect(response.body).to.include.all.keys('firstname', 'lastname');
				done();
			});
	});
});

//test route for accessing client's communications associated with signed-in user
describe('GET /clients/:email/communications', () => {
	it('should return an array of communication of client associated with user', (done) => {
		api
			.get(`/clients/${clientInfo.email}/communications`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				//console.log(response.body)
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

//test route for accessing client's transactions associated with signed-in user
describe('GET /clients/:email/transactions', () => {
	it('should return an array of transactions of client associated with user', (done) => {
		api
			.get(`/clients/${clientInfo.email}/transactions`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				console.log(response.body);
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

//test route for editing client's info associated with signed-in user
describe('PUT /clients/:email', () => {
	const clientToUpdate = {
		email: 'SteveJ@gmail.com',
		lastname: 'Jack',
	};
	before((done) => {
		api
			.put(`/clients/${clientToUpdate.email}`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send(clientToUpdate)
			.end(done);
	});
	it('should return client with updated last name', (done) => {
		api
			.get(`/clients/${clientToUpdate.email}`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				console.log(response.body);
				expect(response.body).to.have.property('lastname', 'Jack');
				done();
			});
	});
});

//test route for create new client for signed-in user
describe('POST /clients', () => {
	const newClient= {
        email: 'PeterJ@gmail.com',
        firstname:'Peter',
		lastname: 'Jackson',
	};
	before((done) => {
		api
			.post(`/clients`)
			.set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newClient)
            .end(done)
	});
	it('should return collections of client with new created client', (done) => {
		api
			.get(`/clients`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
                console.log(response.body);
                const clientToFind = response.body.find((client)=> client.id === newClient.id)
				expect(clientToFind).to.be.an('object');
				done();
			});
	});
});

//test route for delete new created client and return original clients
describe('DELETE /clients/:email', () => {
	let clientToDelete;
	before((done) => {
		api
			.get(`/clients`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				const clients = response.body;
				clientToDelete = clients[clients.length - 1].email;
				done();
			});
	});
	before((done) => {
		api
			.delete(`/clients/${clientToDelete}`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end(done);
	});
	it('should deleted the last created client', (done) => {
		api
			.get(`/clients`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				console.log(response.body);
				const deletedClient = response.body.find(
					(client) => client.id === clientToDelete
				);
				expect(deletedClient).to.equal(undefined);
				done();
			});
	});
});
