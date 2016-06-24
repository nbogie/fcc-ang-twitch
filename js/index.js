(function () {

    'use strict';
    /*global angular */
    /*global $ */
    /*global console */

    var app = angular.module('twitchApp', []);

    app.controller('StreamController', function ($http) {

        var channelNameList = ['esl_sc2', 'freecodecamp', 'comster404', 'habathcx', 'ogamingsc2'];

        this.game = "League of Legends";
        this.possibleGames = ["one", "two", "three"];
        this.streams = [];

        var that = this;

        this.getForGame = function () {
            if (that.game !== '-') {
                console.log('Requesting streams for game: ' + that.game);

                $http.get('https://api.twitch.tv/kraken/streams/?', {
                    'params': {
                        'game': that.game,
                        'limit': 8
                    }
                }).then(function (response) {
                    console.log('assigning streams from response: ');
                    that.streams = response.data.streams;
                });
            }
        };

        this.getFaves = function () {
            $http.get('https://api.twitch.tv/kraken/streams/?', {
                'params': {
                    'channel': channelNameList.join(',')
                }
            }).then(function (response) {
                //get others: (data, channelNameList);
                that.streams = response.data;
                //console.log('retrieved ' + that.streams.length + ' streams from json');
            });
        };

        var getGames = function () {
            var gamesURLs = {
                'real': 'https://api.twitch.tv/kraken/games/top?limit=30',
                'local': '/sample-json/games.json'
            };
            $http.get(gamesURLs.real).then(function (response) {
                var names = response.data.top.map(function (g) {
                    return g.game.name;
                });
                console.log("game names: " + names);
                that.possibleGames = names;
            });
        };

        getGames();
        //        getForGame();
    }); // ends controller
}()); //ends the wrapping IIFE
