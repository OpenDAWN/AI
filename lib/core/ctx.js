define([], function() {

	var ctx;

	try {
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		ctx = new AudioContext();
	} catch(e) {
		throw 'audio API not supported in this browser';
	}

	return ctx;

});