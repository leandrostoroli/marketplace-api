var Product = require('../models/product');

module.exports = function ProductController(controller) {
	controller.post('/:customerId/products', function(req, res) {
		var product = new Product(req.body);
		product.customerId = req.param("customerId");
		product.save(function(err) {
			if(err) {
				console.error(err);
				res.send(400, JSON.stringify(err));
			}
			res.json(product);
		});
	});
}