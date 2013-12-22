/**
 *	widely inspired from :
 *	http://ejohn.org/blog/simple-javascript-inheritance/
 */
define(
	[], 
	function() {

		'use strict';

		var initializing = false,
			// allow to understand the following
			funcTest = /ai/.test(function() { ai; }) ? /\b_super\b/: /.*/;

		// base class - does nothing
		var Class = function() {};

		Class.extend = function _extend(prop) {
			var _super = this.prototype;

			initializing = true;
			var prototype = new this(); // set a correct instanceof
			initializing = false;

			for (var name in prop) {
				if (typeof prop[name] === 'function' && 
					typeof _super[name] === 'function' &&
					funcTest.test(prop[name])
				) {
					(function(name, fn) {
						return function() {
							var tmp = this._super;

							this._super = _super[name];
							var result = fn.apply(this, arguments);
							this._super = tmp;

							return result;
						}
					}(name, prop[name]));
				} else {
					prototype[name] = prop[name] 
				}
			}

			// class constructor
			function Class() {
				if (!initializing && this.initialize) {
					this.initialize.apply(this, arguments);
				}
			}

			Class.prototype = prototype;
			Class.prototype.constructor = Class;
			Class.extend = _extend;

			// model generic methods

			return Class;
		}

		return Class;
	}
)