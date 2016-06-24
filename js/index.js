(function () {

    'use strict';
    /*global angular */
    /*global $ */
    /*global _ */
    /*global console */

    var app = angular.module('twitchApp', []);

    app.controller('StreamController', function ($http) {

        this.missingImage = "https://placekitten.com/100/100";

        var channelNameList = ['esl_sc2', 'freecodecamp', 'comster404', 'habathcx', 'ogamingsc2'];

        this.game = "";
        this.possibleGames = [];
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
                    that.streams = response.data.streams;
                    that.streams.forEach(function (s) {
                        s.status = 'ONLINE';
                    });
                });
            }
        };

        var getSingleOfflineStream = function (channelName) {
            function urlForChannel(channelName) {
                return "https://api.twitch.tv/kraken/channels/" + channelName;
            }
            $http.get(urlForChannel(channelName)).then(function (response) {
                //TODO: deal with failure for removed/non-existent stream
                that.streams.push({
                    'status': 'OFFLINE',
                    'channel': response.data
                });
            }, function (response) {
                that.streams.push({
                    'status': 'MISSING' + response.status,
                    'channel': {
                        'name': channelName
                    }
                });
            });
        };

        this.getFaves = function () {
            $http.get('https://api.twitch.tv/kraken/streams/?', {
                'params': {
                    'channel': channelNameList.join(',')
                }
            }).then(function (response) {
                that.streams = response.data.streams;
                that.streams.forEach(function (s) {
                    s.status = 'ONLINE';
                });
                var namesGot = that.streams.map(function (s) {
                    return s.channel.name;
                });
                //get the missing channels (sadly, one by one. some may not exist.)
                var missing = _.difference(channelNameList, namesGot);
                missing.forEach(function (n) {
                    getSingleOfflineStream(n);
                });
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
                that.possibleGames = names;
            });
        };

        getGames();
        //        getForGame();
    }); // ends controller
}()); //ends the wrapping IIFE
