define(
	[
		'common/utils',
		'core/node'
	],
	function(utils, Node) {

		var ALLOWED_TYPES = ['sine', 'square', 'sawtooth', 'triangle', 'custom'];

		var Oscillator = Node.extend({

			initialize: function(type, frequency) {
				this.cid = utils.uniqid('oscillator');
				this.node = this.ctx.createOscillator();
				// no input
				this.input = this.node;

				var type = type || 'sine';
				var frequency = frequency || 440;

				this.on('change:type', this.setType);
				this.on('change:frequency', this.setFrequency);
				
				this.set({
					type: type,
					frequency: frequency
				});
			},

			setType: function(type) {
				if (ALLOWED_TYPES.indexOf(type) === -1) {
					throw 'wrong type for Oscillator';
				}
				
				this.node.type = type;
			},
			setFrequency: function(frequency) {
				this.node.frequency.value = frequency;
			},

			start: function(delay) {
				this.node.start(delay || 0);
			},

			stop: function(delay) {
				this.node.stop(delay || 0);
			}

		});

		return Oscillator;

	}
);