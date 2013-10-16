var mongoose = require('mongoose');
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var product_controller = require('../controllers/product.js');
var Product = require('../models/product');

describe('ProductController', function() {
	// setup variables
	var customerId = null;
	var url = null;
	var computer = null;

	before(function(done) {
		if (!mongoose.Connection.STATES.connected == mongoose.connection.readyState) {
			mongoose.connect("mongodb://localhost/test");
		}
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

	describe('#validation', function() {
		it('should save a new product', function(done) {
			okAndSaved(done);
		});

		it('should not save without a name', function(done) {
			computer.name = null;
			badRequest(done);
		});

		it('should not save without a sku', function(done) {
			computer.sku = null;
			badRequest(done);
		});

		it('should not save without a price', function(done) {
			computer.price = null;
			badRequest(done);
		});

		it('should not save with negative weight', function(done) {
			computer.weight = -1;
			badRequest(done);
		});

		it('should not save with weight greater than 1000', function(done) {
			computer.weight = 1001;
			badRequest(done);
		});

		it('should not save with negative length', function(done) {
			computer.length = -1;
			badRequest(done);
		});

		it('should not save with length greater than 1000', function(done) {
			computer.length = 1001;
			badRequest(done);
		});

		it('should not save with negative width', function(done) {
			computer.width = -1;
			badRequest(done);
		});

		it('should not save with width greater than 1000', function(done) {
			computer.width = 1001;
			badRequest(done);
		});

		it('should not save with negative height', function(done) {
			computer.height = -1;
			badRequest(done);
		});

		it('should not save with height greater than 1000', function(done) {
			computer.height = 1001;
			badRequest(done);
		});

		it('should not save with negative price', function(done) {
			computer.price = -1;
			badRequest(done);
		});

		it('should not save with price greater than 100000', function(done) {
			computer.price = 100001;
			badRequest(done);
		});

		it('should save with positive price less than 1 and more than 0', function(done) {
			computer.price = 0.01;
			okAndSaved(done);
		});

		it('should not save with negative offer price', function(done) {
			computer.offerPrice = -1;
			badRequest(done);
		});

		it('should not save with offer price greater than 100000', function(done) {
			computer.offerPrice = 100001;
			badRequest(done);
		});
	});


	afterEach(function(done) {
		Product.remove({}, function(err) {
			done();
		});			
	});

	after(function(done) {
		mongoose.disconnect(function() {
			done();
		});
	});

	function badRequest(done) {
		request(url)
			.post('/products')
			.send(computer)
			.end(function(err, res) {
				if (err)
					throw err;

				res.should.have.status(400);
				done();
			});
	}

	function okAndSaved(done) {
		request(url)
			.post('/products')
			.send(computer)
			.end(function(err, res) {
				if (err)
					throw err;

				res.should.have.status(200);
				res.body.should.have.property('_id');
				done();
			});
	}
});
