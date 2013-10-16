var mongoose = require('mongoose');
var express = require('express');
var filesystem = require('fs');
var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

mongoose.connect("mongodb://localhost/test");

// require('./controller/product')(app);
registerControllers(app, filesystem);

app.listen(3000);

function registerControllers(app, filesystem) {
	controllers = filesystem.readdirSync('./controllers');
	for (var i = 0; i < controllers.length; i++) {
		require('./controllers/'+controllers[i])(app);				
	};				
}