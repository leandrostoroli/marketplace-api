var mongoose = require('mongoose');
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var product_controller = require('../controllers/product.js');

describe('ProductController', function() {
	// setup variables
	var customerId = null;
	var url = null;
	var computer = null;

	before(function(done) {
		mongoose.connect("mongodb://localhost/test");
		done();
	});

	beforeEach(function(done) {
		customerId = "0010109290192";
		url = "http://localhost:3000/"+customerId;
		computer = {
			sku: "9283787327872",
			name: "iMac 27 polegadas Core i5 8GB",
			shortDescription: "iMac 27 polegadas Core i5 8GB",
			longDescription: "iMac 27 polegadas Core i5 8GB",
			available: true,
			manufacter: "Apple",
			price: 22.49
		};		
		done();
	});

	after(function(done) {
		mongoose.disconnect(function() {
			done();
		});
	});

	// it('should save and add to timeline', function(done) {
	// 	request(url)
	// 		.post('/products')
	// 		.send(computer)
	// 		.end(function(err, res) {
	// 			if (err)
	// 				throw err;

	// 			res.should.have.status(200);
	// 			res.body.should.have.property('_id');
	// 			done();
	// 		});

	// 	request(url)
	// 		.get('/timeline')
	// 		.end(function(err, res) {
	// 			if (err)
	// 				throw err;

	// 			res.should.have.status(200);
	// 			res.body.should.have.property('_id');
	// 			done();
	// 		});
	// });

});
