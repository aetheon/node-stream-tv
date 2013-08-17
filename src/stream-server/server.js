
var _ = require('lodash'),
	express = require('express'),
	swig = require('swig'),
	cons = require('consolidate')
	PlayController = require('./playController'),
	HtmlController = require('./htmlController'),

	VIEWS_DIR = __dirname + '/html/';

module.exports = {

	run: function(port){

		port = port || 8282;

		var app = express();

		app.configure(function(){
			app.set('view engine', 'html');
			app.set('views', VIEWS_DIR);
			app.engine('html', cons.swig);
		});

		new PlayController(app);
		new HtmlController(app);	

		app.listen(port);

		console.log("Server running:", "http://localhost:" + port + "/");
		

	}

};


