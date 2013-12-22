define(
	[
		'core/class',
		'core/events',
		'core/ctx',
	], 
	function(Class, Events, ctx) {

		/**
   		 * 
   		 */
		var ProtoNode = Class.extend({

			ctx: ctx,

			connect: function(node) {
				if (node.input) {
					console.log(node);
					this.node.connect(node.input); // lib context
				} else {
					this.node.connect(node); // raw js object
				}
				// allow chaining
				return node;
			},

			// implements a simple "backbone like" model with event triggering
			set: function(attr, value) {
				if (typeof attr === 'object') {
					for (var i in attr) {
						this.set(i, attr[i]);
					}
					return;
				}

				if (!this.attributes) {
					this.attributes = {};
				}

				if (value === this.attributes[attr]) {
					return;
				}

				this.attributes[attr] = value;
				this.trigger('change:' + attr, this.attributes[attr], this);
			},

			get: function(attr) {
				if (this.attributes && this.attributes[attr]) {
					return this.attributes[attr];
				}
			}
		});

		// add events behavior
		var Node = ProtoNode.extend(Events.prototype);


		return Node;

	}
);