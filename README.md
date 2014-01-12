Audio Interface
===================================================

Readings :
---------------------------------------------------

example building a library with requirejs
https://github.com/requirejs/example-libglobal

Structure :
---------------------------------------------------

Interface Chain (extend Node - Events)

    - constructor(object {id: node})
    - setAccess(accessId, AudioParam[, deepParam])
    - set(accessId, value) /* value could also be a node or an automation ? */
    - add a mute toggle



-- straight to /projects/circles
AI :
	- oscillator (ok)
	- gain (ok)
	- filter (ok)
	- paner
	- enveloppe adsr (ok)
    - bufferLoader (ok)
    - reverb (ok)
	# source
	- mute (method toggle) - extend gain
	- tremolo


	- aux
	- master
    - limiter
	- chain (very generic, connect expose a chain.input and a chain.connect just like any other node)
		could be used to create any type of audio chain and in another audio chain

# composites
# 	- effects
# 		reverb, filter, compressor, ...

reverb needs a buffer loader


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

remove Class
	- use ObjectCreate ?

source
	- createSource

needs :
	core:

	nodes:
		source
			oscillator
			bufferSource
		process
		analyse




	create sources

	access AudioParams (linearRampToValue, etc...)

	set(name, value, 'linear', duration)








