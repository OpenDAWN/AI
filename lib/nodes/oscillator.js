define(
	[
		'common/utils',
		'core/node'
	],
	function(utils, Node) {

        'use strict';

		var ALLOWED_TYPES = ['sine', 'square', 'sawtooth', 'triangle', 'custom'];

		var Oscillator = function(type, frequency, start) {
			this.cid = utils.uniqid('oscillator');

			this.node = this.ctx.createOscillator();
			this.createAudioGraph();

			var type = (ALLOWED_TYPES.indexOf(type) !== -1) ? type : 'sine';

			this.set({
				type: type,
				frequency: frequency
			});

            if (start) {
                this.start();
            }
		}

		Oscillator.prototype = Object.create(Node.prototype, {
			constructor: { value: Oscillator },

			start: {
				value: function(delay, duration) {
					this.node.start(this.ctx.currentTime + ((delay / 1000) || 0));

					if (duration) {
						this.stop(delay + duration);
					}
				}
			},

			stop: {
				// unlike the raw API, delay is in milliseconds
				value: function(delay) {
					var delay = (delay / 1000 || 0);
					this.node.stop(this.ctx.currentTime + delay);
				}
			}

		});

		return Oscillator;

	}
);
