'use strict';
angular.module('lifegraphApp')
    .directive('graphLife', function() {

    var template = '',
        settings = {};

    var links, link, nodes, node, svg, force, outer, vis, dragLine;

    // mouse event vars
    var selectedNode = null,
        selectedLink = null,
        mousedownLink = null,
        mousedownNode = null,
        mouseupNode = null;


    return {
        controller: function ($scope, $element) {
            console.log('working with graphs!!', $element);

            var updateSettings = function(){
                settings.width = window.innerWidth;
                settings.height = window.innerHeight;
            };


            var buildScales = function(){

                var tick =  function(){

                link.attr('x1', function(d) { return d.source.x; })
                    .attr('y1', function(d) { return d.source.y; })
                    .attr('x2', function(d) { return d.target.x; })
                    .attr('y2', function(d) { return d.target.y; });

                node.attr('cx', function(d) { return d.x; })
                    .attr('cy', function(d) { return d.y; });

                };

                force = d3.layout.force()
                    .size([settings.width, settings.height])
                    .nodes([{}])
                    .linkDistance(50)
                    .charge(-200)
                    .on('tick', tick);
            };

            var rescale = function() {
                var trans = d3.event.translate;
                var scale = d3.event.scale;

                vis.attr('transform',
                    'translate(' + trans + ')' + ' scale(' + scale + ')');
            };

            function mousedown() {
                if (!mousedownNode && !mousedownLink) {
                    // allow panning if nothing is selected
                    vis.call(d3.behavior.zoom().on("zoom"), rescale);
                    return;
                }
            }

            function mousemove() {
                if (!mousedownNode) return;

                // update drag line
                dragLine
                        .attr("x1", mousedownNode.x)
                        .attr("y1", mousedownNode.y)
                        .attr("x2", d3.svg.mouse(this)[0])
                        .attr("y2", d3.svg.mouse(this)[1]);

            }

            function mouseup() {
                if (mousedownNode) {
                    // hide drag line
                    dragLine
                        .attr("class", "dragLine_hidden")

                    if (!mouseupNode) {
                        // add node
                        var point = d3.mouse(this),
                            node = {x: point[0], y: point[1]},
                            n = nodes.push(node);

                        // select new node
                        selected_node = node;
                        selected_link = null;

                        // add link to mousedown node
                        links.push({source: mousedownNode, target: node});
                    }

                    redraw();
                }
                // clear mouse event vars
                resetMouseVars();
            }

            function resetMouseVars() {
                mousedownNode = null;
                mouseupNode = null;
                mousedownLink = null;
            }

            var redrawGraph = function(){
                link = link.data(links);

                    link.enter().insert('line', '.node')
                            .attr('class', 'link')
                            .on('mousedown',
                                function(d) {
                                    mousedownLink = d;
                                    if (mousedownLink === selectedLink) {
                                        selectedLink = null;
                                    } else {
                                        selectedLink = mousedownLink;
                                    }
                                    selectedNode = null;
                                    redrawGraph();
                                });

                    link.exit().remove();

                    link
                        .classed('link_selected', function(d) { return d === selectedLink; });

                    node = node.data(nodes);

                    node.enter().insert('circle')
                            .attr('class', 'node')
                            .attr('r', 5)
                            .on('mousedown',
                                function(d) {
                                    // disable zoom
                                    vis.call(d3.behavior.zoom().on('zoom'), null);

                                    mousedownNode = d;
                                    if (mousedownNode == selectedNode) selectedNode = null;
                                    else selectedNode = mousedownNode;
                                    selectedLink = null;

                                    // reposition drag line
                                    dragLine
                                            .attr('class', 'link')
                                            .attr('x1', mousedownNode.x)
                                            .attr('y1', mousedownNode.y)
                                            .attr('x2', mousedownNode.x)
                                            .attr('y2', mousedownNode.y);

                                    redraw();
                                })
                            .on('mousedrag',
                                function(d) {
                                    // redraw();
                                })
                            .on('mouseup',
                                function(d) {
                                    if (mousedownNode) {
                                        mouseupNode = d;
                                        if (mouseupNode == mousedownNode) { resetMouseVars(); return; }

                                        // add link
                                        var link = {source: mousedownNode, target: mouseupNode};
                                        links.push(link);

                                        // select new link
                                        selectedLink = link;
                                        selectedNode = null;

                                        // enable zoom
                                        vis.call(d3.behavior.zoom().on('zoom'), rescale);
                                        redraw();
                                    }
                                })
                        .transition()
                            .duration(750)
                            .ease('elastic')
                            .attr('r', 6.5);

                    node.exit().transition()
                            .attr('r', 0)
                        .remove();

                    node
                        .classed('node_selected', function(d) { return d === selectedNode; });



                    if (d3.event) {
                        // prevent browser's default behavior
                        d3.event.preventDefault();
                    }

                    force.start();
                };

            var buildGraph = function(){
                updateSettings();

                svg = svg ||  d3.select($element[0]).append('svg')
                    .attr('class', 'graph-behavior-time');


                svg.attr('width', settings.width)
                    .attr('height', settings.height);

                outer = d3.select('#chart')
                    .append('svg:svg')
                        .attr('width', settings.width)
                        .attr('height', settings.height)
                        .attr('pointer-events', 'all');

                vis = outer
                  .append('svg:g')
                    .call(d3.behavior.zoom().on('zoom', rescale))
                    .on('dblclick.zoom', null)
                  .append('svg:g')
                    .on('mousemove', mousemove)
                    .on('mousedown', mousedown)
                    .on('mouseup', mouseup);

                vis.append('svg:rect')
                    .attr('width', settings.width)
                    .attr('height', settings.height)
                    .attr('fill', 'white');




                buildScales();

                dragLine = vis.append('line')
                    .attr('class', 'drag_line')
                    .attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', 0)
                    .attr('y2', 0);
            };
            buildGraph();

        },
        template: template,
        scope: true
    };
});