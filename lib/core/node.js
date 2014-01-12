define(
	[
		'core/events',
		'core/ctx',
	],
	function(Events, ctx) {

        'use strict';

        /**
         *  should be considered as an abstract class
         */

        // keep the constructor empty
		var Node = function() {};

		Node.prototype = Object.create(Events.prototype, {

			constructor: { value: Node },
			ctx: { value: ctx },

            // @TODO allow connecting a point in a Chain instance
			connect: {
				value: function(node, /* AudioParam */ param) {
                    var input;

                    if (node instanceof Node) {
                        input = (!param) ? node.inlet : node.node[param];
                    } else {
                        input = (!param) ? node : node[param];
                    }

                    this.outlet.connect(input);
					// allow chaining
					return node;
				}
			},

			createAudioGraph: {
				value: function() {
					if (this.node.numberOfInputs !== 0) {
                        this.inlet = this.ctx.createGain();
						this.inlet.connect(this.node);
					}

                    this.outlet = this.ctx.createGain();
					this.node.connect(this.outlet);
				}
			},

			// implements a simple "backbone like" model with event triggering
			// should be able to be used according with AudioParam
			set: {
				value: function(param, value) {
					if (typeof param === 'object') {
						for (var i in param) {
							this.set(i, param[i]);
						}
						return;
					}

					if (!this.node.hasOwnProperty(param)) {
						throw this.cid + ' has no param ' + param;
					}

					// if implements AudioParam interface
					if (this.node[param] instanceof AudioParam) {
						this.node[param].value = value;
                    // else (example: bufferSource
					} else {
						this.node[param] = value;
					}

					// this.attributes[param] = value;
					this.trigger('change:' + param, value, this);
				}
			},

            /**
             * is not reliable as it is not changing with automations
             */
			get: {
				value: function(param) {
					if (this.node[param].value) {
						return this.node[param].value;
					}
				}
			}
		});

		return Node;

	}
);
