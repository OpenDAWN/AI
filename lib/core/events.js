define(
	[
	],
	function() {

		'use strict';

		function Events() {};

		Events.prototype = Object.create(null, {
			constructor: {
				value: Events
			},

			on: {
				value: function(channel, callback, ctx) {
					// store communications in events
					if (!this.events) { this.events = {}; }
					if (!this.events[channel]) { this.events[channel] = []; }
        			if (typeof callback !== 'function') {
						throw 'callback must be function'
					}

					var subscription = {
						callback: callback,
						ctx: (ctx || this)
					};

					this.events[channel].push(subscription);

					return subscription;
				}
			},

			off: {
				value: function(channel, ticket) {
					if (!this.events || !this.events[channel]) {
						return;
					}

					if (!ticket) {
						delete this.events[channel];
						return;
					}

					this.events[channel].forEach(function(subscription, index) {
						if (
							(ticket.callback === subscription.callback) &&
							(ticket.ctx === subscription.ctx)
						) {
							this.events[channel].slice(index, index + 1);
						}
					}, this);
				}
			},

			trigger: {
				value: function(channel) {
					if (!this.events || !this.events[channel]) {
						return;
					}

					var args = Array.prototype.slice.call(arguments, 1);

					this.events[channel].forEach(function(subscription, index) {
						subscription.callback.apply(subscription.ctx, args);
					});
				}
			}

		});

		return Events;

	}
)