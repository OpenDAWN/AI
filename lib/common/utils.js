// utils function
define([], function() {

	'use strict';

	var counter = 0;

	var utils = {
		uniqid: function(prefix) {
			var id = (counter += 1) + '';
			return prefix ? prefix + '-' + id : id;
		}
	}

	return utils;

})