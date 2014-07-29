'use strict';
angular.module('lifegraphApp')
    .directive('graphLife', function() {

    var optionsForNewNode = [
        'Move to another company?',
        'Move to another team?',
        'Try for promotion?',
        'Steady progress?',
        'Create a new initiative?',
        'Go part time?',
        'Retrain?',
    ];

    var transitionTime = 300;
    var nodes = [
        {
            name: 'I was born',
            angle: 0,
            distance: 100,
            x: 100,
            y: 100
        },
        {
            name: 'node2',
            distance: 100,
            angle: 0,
        },
        {
            name: 'node2',
            distance: 100,
            angle: 45,
        }
    ];


    var links = [
        {source: 1, target: 0, value: 1},
        {source: 2, target: 1, value: 1}
    ];


    var settings = {},
        actions = {
            isMouseDown: false
        },
        svg,
        svgGroups = {},
        svgNodes,
        svgLines;


    var prepareNodes = function(){
        var previousNode;

        nodes.forEach(function(node){

            if (previousNode && !!!node.isBeingDragged){
                var px = previousNode.x;
                var py = previousNode.y;
                var angle = node.angle;

                var nx = (Math.cos(angle * (Math.PI /180)) * node.distance) + px;
                var ny = (Math.sin(angle * (Math.PI/180)) * node.distance) + py;

                node.x = nx;
                node.y = ny;

            }

            previousNode = node;

        });
    };


    prepareNodes();


    return {
        controller: function ($scope, $element) {

            var normalizeNodes = function(){
                var previousNode;
                nodes.forEach(function(node){
                    if (node.isBeingDragged){
                        node.isBeingDragged = undefined;

                        var deltaX = node.x - previousNode.x;
                        var deltaY = node.y - previousNode.y;


                        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                        var angleInDegrees = Math.atan2(deltaY,  deltaX) * 180 / Math.PI;

                        var roundedAngle = Math.round(angleInDegrees / 45) * 45;

                        node.angle = roundedAngle;

                        console.log('distance', distance);
                        node.distance = distance;

                    }

                    previousNode = node;
                });
                prepareNodes();
                buildNodes();
                buildLines();
            };


            var prepareActions = function(){

                var currentNode,
                    currentX,
                    currentY,
                    targetNode,
                    isAddingNode = false;

                actions.mouseDown = function(e, d, a){
                    actions.isMouseDown = true;
                    currentNode = e;
                    console.log('e', e, d, a);
                };

                actions.mouseDownAlt = function(){
                    hideNodes();
                    actions.isMouseDown = true;
                    currentNode = nodes[nodes.length-1];
                    isAddingNode = true;
                    targetNode = addNode();
                    targetNode.x = currentX;
                    targetNode.y = currentY;
                    targetNode.isBeingDragged = true;
                    actionUpdate();
                    normalizeNodes();
                    buildNodes();
                    buildLines();
                };

                actions.mouseUp = function(e){
                    if (!actions.isMouseDown) { return; }

                    var coords = d3.mouse(svgGroups.actions[0][0]);
                    currentX = coords[0];
                    currentY = coords[1];

                    actions.isMouseDown = false;

                    if (e.name !== undefined && !isAddingNode){
                        popNodes(e);
                    } else if (optionsForNewNode.indexOf(e) !== -1){
                        targetNode = addNode();
                        targetNode.x = currentX;
                        targetNode.y = currentY;
                        buildNodes();
                        buildLines();
                        console.log('its a new node', targetNode, currentX, currentY);
                    }

                    isAddingNode = false;
                    console.log('mouse is up');
                    normalizeNodes();
                    targetNode = undefined;
                };

                actions.mouseMove = function(e){
                    var coords = d3.mouse(svgGroups.actions[0][0]);
                    currentX = coords[0];
                    currentY = coords[1];

                    if (e && e.name){
                        console.log('e.name', e.name);
                    }

                };

                var actionUpdate = function(){
                    if (actions.isMouseDown) {
                        if (targetNode){
                            targetNode.x = currentX;
                            targetNode.y = currentY;
                            buildNodes();
                            buildLines();
                        }
                    }
                };

                d3.timer(actionUpdate, 16);

            };

            var addNode = function(){
                var newNode = {
                    name: 'node4',
                    angle: 0,
                    isBeingDragged: true,
                    distance: 100
                };

                nodes.push(newNode);

                links.push({
                    source: nodes.length - 1,
                    target: nodes.length -2,
                    value: 1
                });

                prepareNodes();
                buildGraph();

                return newNode;
            };


            var updateSettings = function(){
                settings.width = window.innerWidth;
                settings.height = window.innerHeight;
            };

            var force;
            var buildScales = function(){
                var tick = function() {
                    svgLines.attr('x1', function(d) { return d.source.x; })
                        .attr('y1', function(d) { return d.source.y; })
                        .attr('x2', function(d) { return d.target.x; })
                        .attr('y2', function(d) { return d.target.y; });

                    svgNodes.attr('cx', function(d) { return d.x; })
                        .attr('cy', function(d) { return d.y; });
                };



                force = d3.layout.force()
                    .size([settings.width, settings.height])
                    .charge(-400)
                    .linkDistance(40)
                    .on('tick', tick);

                force
                    .nodes(nodes)
                    .links(links)
                    .start();
            };

            var buildNodes = function(){

                svgNodes = svgGroups.nodes.selectAll('.node')
                    .data(nodes);

                //creation
                svgNodes
                    .enter()
                    .append('circle')
                    .attr('class', 'node')
                    .on('mousedown', actions.mouseDown)
                    .on('mousemove', actions.mouseMove)
                    .on('mouseup', actions.mouseUp);

                // remove
                svgNodes
                    .exit()
                    .remove();

                var transitionDuration = (actions.isMouseDown) ? 0 : transitionTime;


                svgNodes
                    .transition()
                    .duration(transitionDuration)
                    .attr('cx', function(d){
                        return d.x;
                    })
                    .attr('cy', function(d){
                        return d.y;
                    })
                    .attr('r', 10);

            };


            var popNodes = function(node){
                var x = node.x,
                    y = node.y;


                var svgNodesPop = svgGroups.nodes.selectAll('.node-pop')
                    .data(optionsForNewNode);


                console.log('popping nodes', x, y);

                //creation
                svgNodesPop
                    .enter()
                    .append('g')
                    .attr('class', 'node-pop')
                    .attr('transform', 'translate('+x+', '+y+')')
                    .attr('opacity', 0)
                    .attr('y', y)
                    .append('circle')
                    .attr('r', 10)
                    .on('mousedown', actions.mouseDownAlt)
                    .on('mousemove', actions.mouseMove)
                    .on('mouseup', actions.mouseUp);

                svgNodesPop
                    .append('text')
                    .text(function(d){
                        return d;
                    })
                    .attr('x', 20);

                // remove
                svgNodesPop
                    .exit()
                    .remove();



                svgNodesPop
                    .transition()
                    .duration(300)
                    .delay(function(d, i){
                        return i * 25;
                    })
                    .attr('transform', function(d, i){
                        var ny =y + (i * 50 - 30);
                        return  'translate('+ (x + 75) +',' + ny+ ')';
                    })
                    .attr('opacity', 1);


            };

            var hideNodes = function(){
                var svgNodesPop = svgGroups.nodes.selectAll('.node-pop');

                svgNodesPop
                    .transition()
                    .duration(300)
                    .attr('opacity', 0)
                    .remove();
            };

            var buildLines = function(){
                svgLines = svgGroups.lines.selectAll('.line')
                    .data(links);

                // line creation
                svgLines
                    .enter()
                    .append('line')
                    .attr('class', 'line');

                // line removing
                svgLines
                    .exit()
                    .remove();

                var transitionDuration = (actions.isMouseDown) ? 0 : transitionTime;

                // svgLines
                //     .transition()
                //     .duration(transitionDuration)
                //     .attr('x1', function(d){
                //         return nodes[d.source].x;
                //     })
                //     .attr('y1', function(d){
                //         return nodes[d.source].y;
                //     })
                //     .attr('x2', function(d){
                //         return nodes[d.target].x;
                //     })
                //     .attr('y2', function(d){
                //         return nodes[d.target].y;
                //     });

            };


            var buildGraph = function(){
                updateSettings();

                svg = svg || d3.select($element[0]).append('svg')
                    .attr('class', 'graph-behavior-time')
                    .attr('width', settings.width)
                    .attr('height', settings.height);

                svgGroups.actions = svgGroups.actions || svg.append('g')
                    .attr('class', 'actions')
                    .append('rect')
                    .attr('width', settings.width)
                    .attr('height', settings.height)
                    .attr('fill', 'rgba(0,0,0,0)')
                    .on('mousemove', actions.mouseMove)
                    .on('mouseup', actions.mouseUp);

                svgGroups.lines = svgGroups.lines || svg.append('g')
                    .attr('class', 'lines');

                svgGroups.nodes = svgGroups.nodes || svg.append('g')
                    .attr('class', 'nodes');


                buildScales();
                buildLines();
                buildNodes();

            };
            prepareActions();
            buildGraph();

        },
        scope: true
    };
});