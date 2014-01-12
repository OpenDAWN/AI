define(
    [
        'core/node',
        'common/utils'
    ],
    function(Node, utils) {

        'use strict';

        var Chain = function(nodes, name) {
            this.cid = utils.uniqid((name || 'chain'));

            this.nodes = nodes;
            this.entryPoints = {};

            this.createAudioGraph();
        };

        Chain.prototype = Object.create(Node.prototype, {
            constructor: { value: Chain },

            /**
             *  override simple node audio graph
             */
            createAudioGraph: {
                value: function() {
                    var nodeIds = Object.keys(this.nodes);
                    var lastNode, currentNode;
                    var startAt = 1;

                    var firstNode = this.nodes[nodeIds[0]];
                    // if first node has inputs
                    if (
                        (firstNode.numberOfInputs && firstNode.numberOfInputs !== 0) ||
                        (firstNode.node.numberOfInputs && firstNode.node.numberOfInputs !== 0)
                    ) {
                        this.inlet = this.ctx.createGain();
                        startAt = 0;
                    }

                    this.outlet = this.ctx.createGain();

                    for (var i = startAt, l = nodeIds.length; i <= l; i++) {
                        currentNode = (i === l) ? this.outlet : this.nodes[nodeIds[i]].inlet;
                        lastNode = (i === 0) ? this.inlet : this.nodes[nodeIds[i - 1]];

                        lastNode.connect(currentNode);
                    }
                },
            },

            access: {
                value: function(nodeId) {
                    return this.nodes[nodeId];
                }
            }

        });

        return Chain;

    }
);
