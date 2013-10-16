var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');

var schema = new Schema({
	customerId: String,
	asset: { type: String, required: true },
	action: { type: String, required: true },
	content: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

var Action = mongoose.model('Action', schema);
module.exports = Action;

function Timeline() {
	this.addProduct = function(productParams, callback) {
		var product = new Product(productParams);
		product.customerId = productParams.customerId;
		product.save(function(err) {
			if (err) {
				console.error(err);
				callback(null, err);
			}
			createAction(product, callback);
		});
	};

	this.updateProduct = function(productParams, callback) {
		productParams.updatedAt = Date.now;
		product = new Product(productParams);
		var productData = product.toObject();
		delete productData._id;
		Product.update({ id: product._id }, productData, { upsert: true }, function(err) {
			if (err) {
				console.error(err);
				callback(null, err);
			}
			Product.findById(product, function(err, product) {
				if (err) {
					console.error(err);
					callback(null, err);
				}
				createAction(product, callback);
			});
		}); 
	}

	this.getByCustomerId = function(customerId, callback) {
		Action.find({ customerId: customerId })
			.exec(callback);
	};

	function createAction(product, callback) {
		var action = new Action({ customerId: product.customerId, 
			asset: "PRODUCT", 
			action: "ADD_PRODUCT",
			content: JSON.stringify(product) });
		action.save(function(err) {
				if (err) {
					console.error(err);						
					callback(null, err);
				}
				callback(product);
			});
		}
};

module.exports.Timeline = new Timeline();
