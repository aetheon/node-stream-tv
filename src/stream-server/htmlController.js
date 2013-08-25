
var _ = require('lodash'),
	State = require('./state');

module.exports = function(app){

	/*
	 * Controller urls
	 *
	 */

	app.get('/', function(req, res){
	  
	  var data = {
	  	channels: State.getChannels(),
	  	selected: State.getCurrentChannel() || {}
	  }; 

	  res.render("index.html", data);

	});


}