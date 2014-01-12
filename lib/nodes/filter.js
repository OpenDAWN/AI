define(
    [
        'common/utils',
        'core/node'
    ], function (utils, Node) {

        'use strict';

        var ALLOWED_TYPES = [
            'lowpass',
            'highpass',
            'bandpass',
            'lowshelf',
            'highshelf',
            'peaking',
            'notch',
            'allpass'
        ];

        // https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#BiquadFilterNode
        var Filter = function(type, frequency, gain, Q) {
            if (ALLOWED_TYPES.indexOf(type) === -1) {
                throw new Error('unknow type for filter: ' + type);
            }

            this.cid = utils.uniqid('filter');

            this.node = this.ctx.createBiquadFilter();
            this.createAudioGraph();

            this.set('type', type);

            // fallback on API default values
            this.set({
                frequency: (frequency || 350),
                Q: (Q || 1),
                gain: (gain || 0)
            });
        }

        Filter.prototype = Object.create(Node.prototype, {
            constructor: { value: Filter }
        });

        return Filter;
    }
)
