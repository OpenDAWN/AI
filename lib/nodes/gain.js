define(
	[
		'common/utils',
		'core/node'
	], function(utils, Node) {

		'use strict';

		var defaultGainValue = 1;

		var Gain = function (value) {
			this.cid = utils.uniqid('gain');

			this.node = this.ctx.createGain();
			this.createAudioGraph();

			var value = (typeof value === 'number') ? value : defaultGainValue;

			this.set('gain', value);
		}

		Gain.prototype = Object.create(Node.prototype, {
			constructor: { value: Gain },
		});

		return Gain;
	}
);
