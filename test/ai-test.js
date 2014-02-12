requirejs.config({
	baseUrl: '../lib',
	urlArgs: 'ai=' + (new Date().getTime()),
	paths: {
		'ai': '../ai'
	}
});

define(['ai'], function(AI) {

    var loader = new AI.BufferLoader({
        'cathedral': './impulses/cathedral_rcards_rear.wav',
        'arena': './impulses/arena_20_000_seat_floor_1_2_rcard.wav',
    });

    // console.log(loader);

    loader.on('error', function(type, id, path) {
        console(arguments);
    });

    loader.on('start', function() {
        console.log('loader start');
    });

    loader.on('progress', function(progress, bufferInfos) {
        console.log('loader progress', arguments);
    });

    loader.on('load', function(bufferList) {
        console.log('loader loaded', arguments);
        start();
    });

    loader.load();

    function start() {
        // modulator at 2000 - 2200 hertz is nice
        var modulator = new AI.Chain({
            mod: new AI.Oscillator('sine', 2, true),
            modIndex: new AI.Gain(40)
        });

        // create chain
        var myChain = new AI.Chain({
            osc: new AI.Oscillator('sine', 440, true),
            gain: new AI.Gain(0),
            filter: new AI.Filter('lowpass', 500),
            // reverb: new AI.Convolver(loader.get('arena'))
        });

        // modulator.connect(myChain.access('osc'), 'frequency');
        myChain.connect(AI.out);

        var now = AI.ctx.currentTime;

        // create enveloppe
        var env = new AI.ADSR({
            a: [1, 0.03],
            d: [0.3, 0.2],
            s: [0.3, 0.1],
            r: [0, 2]
        });

        // ui
        var btn = document.getElementById('test');

        btn.addEventListener('click', function(e) {
            e.preventDefault();

            env.applyTo(myChain.access('gain'));
        }, false);
    }

})
