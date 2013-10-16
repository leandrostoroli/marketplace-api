var mongoose = require('mongoose');
var should = require('should');
var assert = require('assert');
var Product = require('../models/product');
var Action = require('../models/action');
var Timeline = Action.Timeline;

describe('Action', function() {
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
			customerId: customerId,
			sku: "9283787327872",
			name: "iMac 27 polegadas Core i5 8GB",
			shortDescription: "iMac 27 polegadas Core i5 8GB",
			longDescription: "iMac 27 polegadas Core i5 8GB",
			available: true,
			manufacter: "Apple",
			price: 22.49
		};		
		computer2 = {
			customerId: customerId,
			sku: "9283787327873",
			name: "iMac 21 polegadas Core i7 8GB",
			shortDescription: "iMac 21 polegadas Core i7 8GB",
			longDescription: "iMac 21 polegadas Core i7 8GB",
			available: true,
			manufacter: "Apple",
			price: 19.49
		};		
		done();
	});

	describe('Timeline', function() {

		describe('#addProduct', function() {

			it('should save product and create/save an action for that product', function(done) {
				Timeline.addProduct(computer, function(computer, err) {
					Timeline.getByCustomerId(customerId, function(err, timeline) {
						should.exist(timeline);
						timeline.should.have.length(1);
						done();
					});
				});
			});	

		});

		describe('#updateProduct', function() {

			it('should update product and create/save an action for that product', function(done) {
				Timeline.addProduct(computer, function(computer, err) {
					computer.price = computer.price + 10.50;
					Timeline.updateProduct(computer, function(computer, err) {
						Timeline.getByCustomerId(customerId, function(err, timeline) {
							should.exist(timeline);
							timeline.should.have.length(2);
							console.log(computer);
							done();	
						});
					});
				});
			});

		});

		describe('#getByCustomerId', function() {

			it('should get timeline ordered by created at action desc', function(done) {
				Timeline.addProduct(computer, function(computer, err) {
					Timeline.addProduct(computer2, function(computer2, err) {
						Timeline.getByCustomerId(customerId, function(err, timeline) {
							should.exist(timeline);
							timeline.should.have.length(2);
							var content1 = JSON.parse(timeline[0].content);
							var content2 = JSON.parse(timeline[1].content);
							should(content1.sku).eql(computer.sku);
							should(content2.sku).eql(computer2.sku);
							done();
						});
					});
				});
			});

		});

	});

	afterEach(function(done) {
		Product.remove({}, function(err) {
			Action.remove({}, function(err) {
				done();
			});
		});			
	});

	after(function(done) {
		mongoose.disconnect(function() {
			done();
		});
	});

});
