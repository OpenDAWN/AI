define(
	[
		'common/utils',
		'core/node'
	], function(utils, Node) {

		'use strict';

		var defaultValue = 1;

		var Gain = Node.extend({

			initialize: function(value) {
				this.cid = utils.uniqid('gain');

				this.input = this.node = this.ctx.createGain();
				
				var value = (typeof value === 'number') ? value : defaultValue;
				this.on('change:value', this.setValue);
				this.set('value', value);
			},

			setValue: function(value) {
				this.node.gain.value = value;
			}

		});

		return Gain;
	}
);
