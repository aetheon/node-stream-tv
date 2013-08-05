
var fs = require("fs"),
	_ = require("lodash");




module.exports = {


	/*
	 * Gets all the setting rules from the json files
	 *
	 * @return{Object} Where key is the name of the file normalized and the value its
	 * the filename
	 */
	getAllSettings: function(){

		var files = fs.readdirSync(__dirname + "/../settings/");

		files = _.filter(files, function(fileName){
			return fileName.match(/\.json$/gi);
		});


		var settings = {};
		_.each(
			files,
			function(file){

				var setting = file.toLowerCase();
				setting = setting.replace(/\.json$/gi, "");

				settings[setting] = file;

			}
		);


		return settings;

	}

};