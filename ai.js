define(function(require) {

		var ctx = require('core/ctx'),
			output = ctx.destination
	
		// Expose
		return {
			ctx: ctx,
			output: output,

			Gain: require('node/gain'),
			Oscillator: require('node/oscillator')
		};
	}
);