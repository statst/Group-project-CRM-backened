const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:8000/api/users');
const index = require('../index');

// test to make sure the 401 error show up 
describe('GET /signin', () => {
	it('should return a 401 status', (done) => {
		api.get('/signin').set('Accept', 'application/json').expect(401, done);
	});
});

describe('POST /signin', () => {
	const userCredentials = {
		email: '123@gmail.com',
		password: 'pass123',
	};
	before((done) => {
		api
			.post('/signin')
			.set('Accept', 'application/json')
			.send(userCredentials)
			.expect(200, done)
		// it('should return a 200 status', (done) => {
        //     api.get('/signin').set('Accept', 'application/json')
        //     .end((error,response)=>{
        //         console.log(response)
        //         expect(response.statusCode).to.be(200)
        //         done()
        //     })
		// });
	});
});




// describe('GET /', () => {
// 	it('should get all the user data back', (done) => {
// 		api
// 			.get('/')
// 			.set('Accept', 'application/json')
// 			.end((error, response) => {
// 				console.log(response.body)
// 				expect(response.body).to.be.an('object');
// 				done();
// 			});
// 	});
// });
