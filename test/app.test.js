const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('https://glacial-sands-49555.herokuapp.com/api/users');
const index = require('../index');

// test to make sure the 401 error show up
describe('GET /signin', () => {
	it('should return a 401 status', (done) => {
		api.get('/signin').set('Accept', 'application/json').expect(401, done);
	});
});

//create a token variable
let token;
describe('POST /signin', () => {
	const userCredentials = {
		email: 'tkthedesigner@gmail.com',
		password: 'password2',
	};
	//before test any route, sign in and save token
	before((done) => {
		api
			.post('/signin')
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
			.post('/signin')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.then((response) => {
				expect(200, done());
			});
	});
});

//test route for getting all user data back with saved token passing in
describe('GET /', () => {
	it('should get all the user data back', (done) => {
		api
			.get('/')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
                //console.log(response.body)
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

//test route for getting one user back
describe('GET /:email', () => {
	it('should return an object with valid fields of name and email', (done) => {
		api
			.get('/tkthedesigner@gmail.com')
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
describe('PUT /:email', () => {
	const userToUpdate = {
		email: 'tkthedesigner@gmail.com',
		lastname: 'new-yen',
	};
	before((done) => {
		api
			.put(`/${userToUpdate.email}`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send(userToUpdate)
			.end(done);
	});
	it('should return an user with update last name', (done) => {
		api
			.get(`/${userToUpdate.email}`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				console.group(response.body);
				expect(response.body).to.have.property('lastname', 'new-yen');
				done();
			});
	});
});

//test route for creating new user and find it in database
describe('POST /', () => {
	const newTestUser = {
		firstname: 'test',
		lastname: 'user',
		email: 'testUser2@gmail.com',
		password: 'test123',
	};
	before((done) => {
		api.post('/').set('Accept', 'application/json').send(newTestUser).end(done);
	});
	it('should return collection of user with new created user', (done) => {
		api
			.get('/')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				console.group(response.body);
				const userToFind = response.body.find(
					(user) => user.id === newTestUser.id
				);
				expect(userToFind).to.be.an('object');
				done();
			});
	});
});

//test route for deleting new created user using email and return the original database
describe('DELETE /:email', () => {
	let userToDelete;
	before((done) => {
		api
			.get('/')
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
			.delete(`/${userToDelete}`)
			.set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .end(done)
	});
	it('should delete the last created user', (done) => {
		api
			.get('/')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.end((error, response) => {
				console.group(response.body);
				const deletedUser = response.body.find(
					(user) => user.id === userToDelete
				);
				expect(deletedUser).to.equal(undefined);
				done();
			});
	});
});
