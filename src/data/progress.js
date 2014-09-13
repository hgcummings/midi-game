define(function() {
    'use strict';
    var key = function(level) {
        return 'timeForLevel' + level;
    };
    
    return {
        getTime: function(level) {
            var time = parseInt(localStorage[key(level)]);
            if (isNaN(time)) {
                return null;
            } else {
                return time;
            }
        },
        saveTime: function(level, time) {
            var previousBest = parseInt(localStorage[key(level)]);
            if (isNaN(previousBest) || time < previousBest) {
                localStorage[key(level)] = time;
            }
        }
    };
});