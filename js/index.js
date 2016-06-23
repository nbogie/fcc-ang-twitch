(function () {

    'use strict';
    /*global angular */
    /*global $ */
    /*global console */

    var app = angular.module('twitchApp', []);

    app.controller('StreamController', function () {

        var channelNameList = ['esl_sc2', 'freecodecamp', 'comster404', 'habathcx', 'ogamingsc2'];

        this.game = "";
        this.streams = [];
        var that = this;

        //$('#gameSelect option:selected');
        var getForGame = function () {
            var game = that.game;
            if (game !== '-') {
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
                    console.log('retrieved ' + that.streams.length + ' streams from json');
                }
            );
        };
        getForGame();
    });
}());
