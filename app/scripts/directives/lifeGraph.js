'use strict';
angular.module('lifegraphApp')
    .directive('graphLife', function() {

    var isSelectingSomething = false;


    var kindNodes = [{
            id: 0,
            name: 'Career',
            color: '#FFF'
        },
        {
            id: 1,
            name: 'Learning',
            color: '#BFE2F3'
        },{
            id: 2,
            name: 'Relationships',
            color: '#F4D4D7'
        },{
            id: 3,
            name: 'Health',
            color: '#FEC92F'
        }
    ];

    var nodes = [
            // EDUCATION AND CAREER - KIND 0
        {
            id: 0,
            name: 'Born to parents with degree level education',
            kind: 0,
            strong: true
        },
        {
            id: 1,
            name: 'Nursery from age 6mths',
            kind: 0,
        },
        {
            id: 2,
            name: 'Good primary school, small',
            kind: 1,
        },
        {
            id: 3,
            name: 'Good secondary school, mixed, large',
            kind: 1,
        },
        {
            id: 4,
            name: 'Good A level grades',
            kind: 1,
        },
        {
            id: 5,
            name: 'University',
            kind: 2,
        },
        {
            id: 6,
            name: 'Humanities course',
            kind: 2,
        },
        {
            id: 7,
            name: 'Switched course: to Law ',
            kind: 2,
        },
        {
            id: 8,
            name: 'Completed degree ',
            kind: 2,
        },
        {
            id: 9,
            name: 'Travel',
            kind: 2,
        },
        {
            id: 10,
            name: 'Vocational training',
            kind: 1,
        },
                {
            id: 11,
            name: 'Apprenticeship',
            kind: 1,
        },
        {
            id: 4,
            name: 'Join good firm: junior level',
            kind: 1,
        },

    ];


    var links = [
        // this is CAREER
        {source: 1, target: 0, value: 1},
        
        // this is professional life
        {source: 3, target: 2, value: 1},
        //{source: 4, target: 3, value: 1},

        // this is relationship
        {source: 6, target: 5, value: 1},
    ];

    var weakLinks = [];

    var domFuncs = (function(){

        var moreInfo,
            moreInfoHeader,
            moreInfoBody;

        var init = function(){
            moreInfo = document.querySelector('.more-info');
            moreInfoHeader = document.querySelector('.more-info_header');
            moreInfoBody = document.querySelector('.more-info_body');
        };


        var update = function(options) {
            if (isSelectingSomething) {
                hide();
                return;
            }
            moreInfo.style.display = 'block';
            moreInfo.style.top = options.y + 'px';
            moreInfo.style.left = options.x + 'px';
            moreInfoHeader.textContent = options.header;
            moreInfoBody.textContent = options.description;
        };

        var hide = function(){
            moreInfo.style.display = 'none';
        };

        init();
        return {
            init: init,
            update: update,
            hide: hide
        };
    })();

    var transitionTime = 300;
    


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

                actions.mouseOut = function(){
                    domFuncs.hide();
                };


                actions.mouseDown = function(e, d, a){
                    actions.isMouseDown = true;
                    currentNode = e;
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
                    }

                    isAddingNode = false;
                    normalizeNodes();
                    targetNode = undefined;
                };

                actions.mouseMove = function(e){
                    var coords = d3.mouse(svgGroups.actions[0][0]);
                    currentX = coords[0];
                    currentY = coords[1];

                    if (e && e.name){
                        domFuncs.update({
                            header: e.name,
                            description: e.description,
                            x: currentX,
                            y: currentY
                        });
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

            var buildGradients = function(){

                svgGroups.defs = svg.append('svg:defs');
                var buildGradient = function(name, colour1, colour2){

                    var gradient = svgGroups.defs
                        .append('svg:linearGradient')
                        .attr('id', name)
                        .attr('x1', '100%')
                        .attr('y1', '0%')
                        .attr('x2', '0%')
                        .attr('y2', '0%')
                        .attr('spreadMethod', 'pad');

                    gradient.append('svg:stop')
                        .attr('offset', '0%')
                        .attr('stop-color', colour1)
                        .attr('stop-opacity', 1);

                    gradient.append('svg:stop')
                        .attr('offset', '100%')
                        .attr('stop-color', colour2)
                        .attr('stop-opacity', 1);


                };

                kindNodes.forEach(function(kindSource){
                    kindNodes.forEach(function(kindTarget){
                        var sourceName = kindSource.name.toLowerCase();
                        var targetName = kindTarget.name.toLowerCase();
                        buildGradient(sourceName+'-'+targetName, kindSource.color, kindTarget.color);
                    });
                });
                buildGradient('test', '#FFF', '#000');
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
                    .charge(-200)
                    .linkDistance(60)
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
                    .attr('class', function(node){
                        console.log('node', node);
                        return 'node node-'+kindNodes[node.kind].name.toLowerCase();
                    })
                    .on('mouseout', actions.mouseOut)
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
                    .attr('class', 'line')
                    .attr('stroke', function(d){
                        var sourceKind = kindNodes[d.source.kind].name.toLowerCase();
                        var targetKind = kindNodes[d.target.kind].name.toLowerCase();
                        return 'url(#'+sourceKind+'-'+targetKind+')';
                    });

                // line removing
                svgLines
                    .exit()
                    .remove();


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
                buildGradients();
                buildLines();
                buildNodes();

            };
            prepareActions();
            buildGraph();

        },
        scope: true
    };
});