// utils function
define([], function() {

	'use strict';

	var counter = 0;

	var utils = {
		uniqid: function(prefix) {
			var id = (counter += 1) + '';
			return prefix ? prefix + '-' + id : id;
		}

		// freq2pitch
		// pitch2freq
		// freq2midi
		// midi3freq
	}

	return utils;

})