'use strict';

/**
 * @ngdoc function
 * @name lifegraphApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lifegraphApp
 */
angular.module('lifegraphApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
