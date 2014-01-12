define(
    [
        'common/utils',
        'core/node'
    ], function(utils, Node) {

        'use strict';

        var Convolver = function(buffer) {
            this.cid = utils.uniqid('reverb');

            if (!(buffer instanceof AudioBuffer)) {
                throw new TypeError(this.cid + ': buffer must be an instance of AudioBuffer');
            }

            this.node = this.ctx.createConvolver();
            this.createAudioGraph();

            this.set('buffer', buffer);
        };

        Convolver.prototype = Object.create(Node.prototype, {
            constructor: { value: Convolver },
        });

        return Convolver;
    }
)
