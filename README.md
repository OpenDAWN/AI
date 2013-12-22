Audio Interface
===================================================

Readings :
---------------------------------------------------

example building a library with requirejs
https://github.com/requirejs/example-libglobal

Structure : 
---------------------------------------------------



AI : 
	- oscillator
	- gain
	- filter
	- paner

	- source
	- mute (method toggle) - extend gain


higher level
	- aux
	- master
	- chain (very generic, connect expose a chain.input and a chain.connect just like any other node)
		could be used to create any type of audio chain and in another audio chain

composites
	- effects
		reverb, filter, compressor, ...


AI // namespace
> could extend Events to act as a pubsub
> could also act as a factory

Class
	Class.extend

Node
	Node.attributes 

	Node.set
	Node.get

Events
	Events.events

	Events.on
	Events.off
	Events.trigger



V2
---------------------------------------------








