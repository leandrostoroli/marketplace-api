var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	customerId: String,
	sku: { type: String, required: true },
	name: { type: String, required: true },
	shortDescription: String,
	longDescription: String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	available: { type: Boolean, default: true },
	manufacter: String,
	ean: String,
	weight: { type: Number, min: 0, max: 1000 },
	length: { type: Number, min: 0, max: 1000 },
	width: { type: Number, min: 0, max: 1000 },
	height: { type: Number, min: 0, max: 1000 },
	price: { type: Number, required: true, min: 0, max: 100000 },
	offerPrice: { type: Number, min: 0, max: 100000 }
});


module.exports = mongoose.model('Product', schema);