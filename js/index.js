/*global angular */
var app = angular.module('twitchApp', []);

app.controller('StreamController', function(){
    this.game = "";
    this.foos = [10,20,30,100,1000,50000];
    this.streams = [];
});
