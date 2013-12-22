requirejs.config({
	baseUrl: '../lib',
	urlArgs: 'ai=' + (new Date().getTime()),
	paths: {
		'ai': '../ai'
	}
});

define(['ai'], function(AI) {


	var car = new AI.Oscillator('sine', 200);
	var mod = new AI.Oscillator('sine', 6);
	var modIndex = new AI.Gain(40);


	mod.connect(modIndex).connect(car.node.frequency)
	car.connect(AI.output);

	// car.start();
	mod.start();

})