define(function(require) {

    var ctx = require('core/ctx');

        // Expose
        return {
        ctx: ctx,
        out: ctx.destination,

        // core
        Events: require('core/events'),
        Node: require('core/node'),
        BufferLoader: require('core/bufferLoader'),

        // nodes
        Gain: require('nodes/gain'),
        Oscillator: require('nodes/oscillator'),
        Filter: require('nodes/filter'),
        Convolver: require('nodes/convolver'),
        Chain: require('nodes/chain'),

        // effects
        ADSR: require('components/adsr')

    };
});
