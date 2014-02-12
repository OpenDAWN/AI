define(
    [
        'core/ctx'
    ],
    function(ctx) {

        'use strict';

        // http://www.w3.org/TR/webaudio/#example1-AudioParam-section
        // --------------------------------------------------------------------

        // Parameter automation.
        // void setValueAtTime(float value, double startTime);
        // void linearRampToValueAtTime(float value, double endTime);
        // void exponentialRampToValueAtTime(float value, double endTime);

        // // Exponentially approach the target value with a rate having the given time constant.
        // void setTargetAtTime(float target, double startTime, double timeConstant);
        // cf. http://stackoverflow.com/questions/20588678/webaudio-how-does-timeconstant-in-settargetattime-work

        // // Sets an array of arbitrary parameter values starting at time for the given duration.
        // // The number of values will be scaled to fit into the desired duration.
        // void setValueCurveAtTime(Float32Array values, double startTime, double duration);

        // // Cancels all scheduled parameter changes with times greater than or equal to startTime.
        // void cancelScheduledValues(double startTime);

        // not used
        var mapper = {
            'setValueAtTime': 'setValueAtTime',
            'linearRampToValueAtTime': 'linearRampToValueAtTime',
            'exponentialRampToValueAtTime': 'exponentialRampToValueAtTime',
            'setTargetAtTime': 'setTargetAtTime',
            'setValueCurveAtTime': 'setValueCurveAtTime',
            'cancelScheduledValues': 'cancelScheduledValues',
        };

        // attack
        // decay
        // sustain
        // release

        // duration = a + d + s + r

        var VALUE = 0;
        var TIME = 1;

        //  @TODO trigger events on some points
        var ADSR = function (adsr, d, s, r) {
            // allow a short syntax
            // pass params by reference so they can be modified outside the object
            this.adsr = {
                attack: adsr.attack || adsr.a || (adsr * 1) || 0,
                decay: adsr.decay || adsr.d || d || 0,
                sustain: adsr.sustain || adsr.s || s || 0,
                release: adsr.release || adsr.r || r || 0
            };

            // compute duration
            this.duration = (function(adsr) {
                var duration = 0;

                for (var step in adsr) {
                    duration += adsr[step][TIME];
                }

                return (adsr = undefined) || duration;
            })(this.adsr);
        };

        ADSR.prototype = {
            // could have a kind of strategy here to
            // test different kind of envelopes
            applyTo: function(node, param) {
                var now = ctx.currentTime;
                var param = param || 'gain';
                var audioParam = (node.inlet) ? node.node[param] : node[param];

                audioParam.cancelScheduledValues(now);
                audioParam.setValueAtTime(0, now);
                // attack
                audioParam.linearRampToValueAtTime(
                    this.adsr['attack'][VALUE],
                    now + this.adsr['attack'][TIME]
                );
                // decay
                audioParam.setTargetAtTime(
                    this.adsr['decay'][VALUE],
                    now + this.adsr['attack'][TIME],
                    this.adsr['decay'][TIME] / 8
                );
                // sustain
                // do nothing - (maybe implement a target at time ?)
                // release
                audioParam.setTargetAtTime(
                    this.adsr['release'][VALUE],
                    now + (this.duration - this.adsr['release'][TIME]),
                    this.adsr['release'][TIME] / 8
                );
            }
        }

        return ADSR;

    }
);

