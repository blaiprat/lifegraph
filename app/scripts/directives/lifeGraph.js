'use strict';
angular.module('lifegraphApp')
    .directive('graphLife', function() {


    var nodes = [
        {
            name: 'node1',
            x: 100,
            y: 100
        },
        {
            name: 'node2',
            x: 200,
            y: 200
        },
        {
            name: 'node2',
            x: 300,
            y: 200
        }
    ];

    var links = [
        {source: 1, target: 0, value: 1},
        {source: 2, target: 1, value: 1}
    ];


    var template = '',
        settings = {},
        svg,
        svgNodes,
        svgLines;



    return {
        controller: function ($scope, $element) {

            var updateSettings = function(){
                settings.width = window.innerWidth;
                settings.height = window.innerHeight;
            };


            var buildScales = function(){

            };

            var buildNodes = function(){
                svgNodes = svg.selectAll('.node')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr('class', 'node')
                    .attr('cx', function(d){
                        return d.x;
                    })
                    .attr('cy', function(d){
                        return d.y;
                    })
                    .attr('r', 10);
            };

            var buildLines = function(){
                svgLines = svg.selectAll('.line')
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

                svgLines
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

                svg = svg ||  d3.select($element[0]).append('svg')
                    .attr('class', 'graph-behavior-time')
                    .attr('width', settings.width)
                    .attr('height', settings.height);

                buildScales();
                buildLines();
                buildNodes();

            };
            buildGraph();

        },
        template: template,
        scope: true
    };
});