define(
    [
        'common/utils',
        'core/node'
    ],
    function(utils, Node) {

        // https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#DynamicsCompressorNode
        'use strict';

        var Compressor = function() {
            this.cid = utils.uniqid('compressor');

            this.node = this.ctx.createDynamicCompressor();
            this.createAudioGraph();
        };

        Compressor.prototype = Object.create(Node.prototype, {
            constructor: { value: Compressor }
        });

        return Compressor;
    }
);
