'use strict';
angular.module('lifegraphApp')
    .directive('graphLife', function() {

    var transitionTime = 300;
    var nodes = [
        {
            name: 'node1',
            angle: 0,
            x: 100,
            y: 100
        },
        {
            name: 'node2',
            angle: 0,
        },
        {
            name: 'node2',
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
        var previousNode,
            radius = 100;

        nodes.forEach(function(node){

            if (previousNode && !!!node.isBeingDragged){
                var px = previousNode.x;
                var py = previousNode.y;
                var angle = node.angle;

                var nx = (Math.cos(angle * (Math.PI /180)) * radius) + px;
                var ny = (Math.sin(angle * (Math.PI/180)) * radius) + py;

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

                        var angleInDegrees = Math.atan2(deltaY,  deltaX) * 180 / Math.PI;

                        var roundedAngle = Math.round(angleInDegrees / 45) * 45;

                        node.angle = roundedAngle;

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
                    currentY;

                actions.mouseDown = function(){
                    console.log('mouse is down');
                    actions.isMouseDown = true;
                    currentNode = addNode();
                    actionUpdate();
                    buildNodes();
                    buildLines();
                };

                actions.mouseUp = function(){
                    if (!actions.isMouseDown) { return; }
                    actions.isMouseDown = false;
                    console.log('mouse is up');
                    normalizeNodes();
                    currentNode = undefined;
                };

                actions.mouseMove = function(){
                    var coords = d3.mouse(this);
                    currentX = coords[0];
                    currentY = coords[1];
                };

                var actionUpdate = function(){
                    if (actions.isMouseDown) {
                        if (currentNode){
                            currentNode.x = currentX;
                            currentNode.y = currentY;
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
                    isBeingDragged: true
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


            var buildScales = function(){

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

                svgLines
                    .transition()
                    .duration(transitionDuration)
                    .attr('x1', function(d){
                        return nodes[d.source].x;
                    })
                    .attr('y1', function(d){
                        return nodes[d.source].y;
                    })
                    .attr('x2', function(d){
                        return nodes[d.target].x;
                    })
                    .attr('y2', function(d){
                        return nodes[d.target].y;
                    });

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
                    .attr('fill', 'rgba(0,0,0,1)')
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