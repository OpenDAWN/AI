define(
    [
        'core/ctx',
        'core/events'
    ],
    function(ctx, Events) {
        // sources:
        // http://chromium.googlecode.com/svn/trunk/samples/audio/doc/loading-sounds.html

        'use strict';
        /**
         *  @param map [object] an {id: path, ...} map of the buffers to load
         *  @param loadNow [bool]
         *      load resources when the instance is created
         *      usefull if you don't want to listen loading events
         */
        var BufferLoader = function(map, loadNow) {
            this.map = map;
            this.bufferList = {};
            this.mapLength = Object.keys(this.map).length;
            this.loadCount = 0;

            var loadNow = loadNow || false;

            if (loadNow) {
                this.load();
            }
        };

        BufferLoader.prototype = Object.create(Events.prototype, {
            constructor: { value: 'BufferLoader' },

            load: {
                value: function(buffer) {
                    for (var id in this.map) {
                        this.loadBuffer(id, this.map[id]);
                    }

                    this.trigger('start');
                }
            },

            loadBuffer: {
                value: function(id, path) {
                    var request = new XMLHttpRequest();
                    request.open('GET', path, true);
                    request.responseType = 'arraybuffer';

                    var that = this;

                    request.onload = function() {
                        ctx.decodeAudioData(
                            request.response,
                            function(buffer) {
                                if (!buffer) {
                                    that.trigger('error', 'decode', id, path);
                                }

                                var bufferInfos = {
                                    id: id,
                                    buffer: buffer,
                                    path: path
                                };

                                that.bufferList[id] = bufferInfos;

                                that.loadCount += 1;
                                that.trigger('progress', that.loadCount / that.mapLength, bufferInfos);

                                if (that.loadCount === that.mapLength) {
                                    that.trigger('load', that.bufferList);
                                }

                                that = undefined;
                            }
                        );
                    };

                    request.onerror = function() {
                        that.trigger('error', 'xhr', id, path);
                    };

                    request.send();
                }
            },

            /**
             * returns a buffer by its id
             */
            get: {
                value: function(bufferId, getInfos) {
                    var getInfos = getInfos || false;

                    if (getInfos) {
                        return this.bufferList[bufferId];
                    } else {
                        return this.bufferList[bufferId].buffer;
                    }
                }
            }
        });

        return BufferLoader;
    }
);
