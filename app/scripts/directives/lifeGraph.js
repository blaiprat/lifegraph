'use strict';
angular.module('lifegraphApp')
    .directive('graphLife', function() {


    var isSelectingSomething = false;

    var scales = {};

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
            console.log('update', options, moreInfo.style);
            moreInfo.style.display = 'block';
            moreInfo.style.top = options.y + 'px';
            moreInfo.style.left = options.x + 'px';
            moreInfoHeader.textContent = options.header;
            moreInfoBody.textContent = options.description;
        };

        var hide = function(){
            moreInfo.style.display = 'none';
        };


        return {
            init: init,
            update: update,
            hide: hide
        };
    })();

    domFuncs.init();

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
            name: 'Joined Agrupacio Mutua',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis molestie tellus. Donec placerat, arcu ut tristique sodales, felis ante ullamcorper turpis, et iaculis nisi quam sed leo. Fusce pulvinar commodo turpis, vel dignissim risus placerat sit amet.',
            angle: 0,
            distance: 100,
            year: 2001,
            x: 100,
            y: 100
        },
        {
            name: 'Freelancing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis molestie tellus. Donec placerat, arcu ut tristique sodales, felis ante ullamcorper turpis, et iaculis nisi quam sed leo. Fusce pulvinar commodo turpis, vel dignissim risus placerat sit amet.',
            year: 2004,
            distance: 100,
            angle: 0,
        },
        {
            name: 'Created Zoo',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis molestie tellus. Donec placerat, arcu ut tristique sodales, felis ante ullamcorper turpis, et iaculis nisi quam sed leo. Fusce pulvinar commodo turpis, vel dignissim risus placerat sit amet.',
            year: 2006,
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


        var previousNode;

    var prepareNodes = function(){
        nodes.forEach(function(node){

            if (previousNode && !!!node.isBeingDragged){

                var px = previousNode.x;
                var py = previousNode.y;
                var angle = node.angle;

                console.log('scales', scales, scales.x(node.year));
                var nx = scales.x(node.year);
                // var ny = (Math.sin(angle * (Math.PI/180)) * node.distance) + py;
                var ny = (nx - px) / (Math.tan(angle));
                console.log('ny', ny, nx - px);

                node.x = nx;
                node.y = ny;

            }

            previousNode = node;

        });
    };





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

                actions.mouseDown = function(e, d, a){
                    domFuncs.hide();
                    actions.isMouseDown = true;
                    currentNode = e;
                    console.log('e', e, d, a);
                };

                actions.mouseDownAlt = function(e){
                    console.log('add node', e);
                    hideNodes();
                    actions.isMouseDown = true;
                    currentNode = nodes[nodes.length-1];
                    isAddingNode = true;
                    targetNode = addNode(e);
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

                actions.mouseOut = function(){
                    domFuncs.hide();
                };

                actions.mouseMove = function(e){
                    var coords = d3.mouse(svgGroups.actions[0][0]);
                    currentX = coords[0];
                    currentY = coords[1];

                    if (e && e.name){
                        console.log('e.name', e.name);
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

            var addNode = function(e){
                var newNode = {
                    name: e,
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


            var buildScales = function(){
                scales.x = d3.scale.linear()
                    .domain([1997, 2014])
                    .range([0, settings.width]);
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
                    .on('mouseout', actions.mouseOut)
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

                isSelectingSomething = true;
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

                isSelectingSomething = false;
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
                    .attr('fill', 'rgba(0,0,0,0)')
                    .on('mousemove', actions.mouseMove)
                    .on('mouseup', actions.mouseUp);

                svgGroups.lines = svgGroups.lines || svg.append('g')
                    .attr('class', 'lines');

                svgGroups.nodes = svgGroups.nodes || svg.append('g')
                    .attr('class', 'nodes');


                buildLines();
                buildNodes();

            };
            updateSettings();
            buildScales();
            prepareNodes();
            prepareActions();
            buildGraph();

        },
        scope: true
    };
});