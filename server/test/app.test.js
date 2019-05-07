const expect = require('chai').expect;
const request = require('supertest');
const app = require('../App');

describe('GET /apps', () => {
	it('should return a array of apps', () => {
		return request(app)
			.get('/apps')
			.expect(200)
			.expect('Content-type', /json/)
			.then(res => {
				expect(res.body).to.be.an('array');
			});
	});
	it('should sort by title', () => {
		return request(app)
			.get('/apps')
			.query({ sort: 'title' })
			.expect(200)
			.expect('Content-Type', /json/)
			.then(res => {
				expect(res.body).to.be.an('array');
				let i = 0;
				let sorted = true;
				while (sorted && i < res.body.length - 1) {
					sorted = sorted && res.body[i].App < res.body[i + 1].App;
					i++;
				}
				expect(sorted).to.be.true;
			});
	});
	it('should sort by rank', () => {
		return request(app)
			.get('/apps')
			.query({ sort: 'rank' })
			.expect(200)
			.expect('Content-Type', /json/)
			.then(res => {
				expect(res.body).to.be.an('array');
				let i = 0;
				let sorted = true;
				while (sorted && i < res.body.length - 1) {
					sorted = sorted && res.body[i].Rating < res.body[i + 1].Rating;
					i++;
				}
				expect(sorted).to.be.true;
			});
	});
	it('should contain specific keys', () => {
		return request(app)
			.get('/apps')
			.expect(200)
			.expect('Content-type', /json/)
			.then(res => {
				expect(res.body).to.be.an('array');
				expect(res.body).to.have.lengthOf.at.least(1);
				for (let i = 0; i < res.body.length; i++) {
					expect(res.body[i]).to.include.all.keys('App', 'Rating', 'Genres');
				}
			});
	});
});
