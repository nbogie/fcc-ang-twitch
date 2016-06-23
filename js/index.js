(function () {

    'use strict';
    /*global angular */
    /*global $ */
    /*global console */

    var app = angular.module('twitchApp', ['ngMaterial']);

    app.controller('StreamController', function () {

        var channelNameList = ['esl_sc2', 'freecodecamp', 'comster404', 'habathcx', 'ogamingsc2'];

        this.game = "League of Legends";
        this.possibleGames = ["one", "two", "three"];
        this.streams = [];

        var that = this;

        this.getForGame = function () {
            console.log('get for game, and ' + that.game );
            if (that.game !== '-') {
                $.getJSON('https://api.twitch.tv/kraken/streams/?', {
                        'game': that.game,
                        'limit': 8
                    },
                    function (data) {
                        console.log(JSON.stringify(data, null, 2));
                        that.streams = data.streams;
                    });
            }
        };

        var getFaves = function () {
            $.getJSON('https://api.twitch.tv/kraken/streams/?', {
                    'channel': channelNameList.join(',')
                },
                function (data) {
                    //get others: (data, channelNameList);
                    that.streams = data;
                    //console.log('retrieved ' + that.streams.length + ' streams from json');
                }
            );
        };

        var getGames = function () {
            //$.getJSON('https://api.twitch.tv/kraken/games/top?limit=30', function (data) {
            $.getJSON('sample-json/games.json', function (data) {
                var names = data.top.map(function (g) {
                    return g.game.name;
                });
                console.log("game names: "+ names);
                that.possibleGames = names;
            });
        };

        getGames();
//        getForGame();
    }); // ends controller
}()); //ends the wrapping IIFE
