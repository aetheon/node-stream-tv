
var _ = require('lodash'),
	Settings = require('../stream-tv/settings'),
	Player = require('../stream-tv/player');


var channelsAssociation = Settings.getChannels(), // channelName => file.json
	channelsFiles = _.values(channelsAssociation); // [ .json ]



var channels = [],
	channelsByNameOrIndex = {};
	numberOfChannels = 0,

	currentChannel = null;

_.each(
	channelsFiles,
	function(file){
		var c = Settings.getChannel(file);
		c.id = c.name.replace(/[\s]/g, "").toLowerCase();
		c.index = ++numberOfChannels;
		channels.push(c);

		// help on search
		channelsByNameOrIndex[c.id] = c;
		channelsByNameOrIndex[c.index] = c;
	}
);



var State = {

	getChannels: function(){
		return _.clone(channels);
	},

	getChannel: function(indexOrName){
		
		var settingsFileName = "";

		var channel = null;

		if( typeof(indexOrName) == "number" ) {

			try { channel = channels[indexOrName]; } catch(e) { };
			
			if(!channel){
				if(indexOrName < 0)
					channel = channels[numberOfChannels-1];
				else
					channel = channels[0];
			}

			return channel;
		}

		return channelsByNameOrIndex[indexOrName];

	},

	setCurrentChannel: function(channel){
		currentChannel = _.cloneDeep(channel);
	},

	getCurrentChannel: function(channel){
		
		if(!currentChannel)
			return null;

		return _.cloneDeep(currentChannel);
	}


};

module.exports = State;


return State;