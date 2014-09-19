define(function() {
    'use strict';
    var noteMap = [];
    noteMap[68] = 1;
    noteMap[82] = 1.5;
    noteMap[70] = 2;
    noteMap[84] = 2.5;
    noteMap[71] = 3;
    noteMap[72] = 4;
    noteMap[85] = 4.5;
    noteMap[74] = 5;
    noteMap[73] = 5.5;
    noteMap[75] = 6;
    noteMap[79] = 6.5;
    noteMap[76] = 7;

    var actionMap = [];
    actionMap[32] = 'LAUNCH';
    actionMap[49] = 'EARTH';
    actionMap[50] = 'AIR';
    actionMap[51] = 'FIRE';
    actionMap[52] = 'WATER';
    actionMap[80] = 'PAUSE';

    return {
        noteMap: noteMap,
        actionMap: actionMap,
        init: function() {
            var self = {};
            var currentNote = null;
            var currentDirection = 0;
            var currentAction = null;

            var getNote = function(keyCode) {
                return noteMap[keyCode];
            };

            var getDirection = function(keyCode) {
                if (keyCode === 191) {
                    return 1;
                } else if (keyCode === 90) {
                    return -1;
                }
            };

            var getAction = function(keyCode) {
                return actionMap[keyCode];
            };

            var isGameKey = function(keyCode) {
                return getNote(keyCode) || getDirection(keyCode) || getAction(keyCode);
            };

            document.onkeydown = function(event) {
                if (isGameKey(event.keyCode)) {
                    event.preventDefault();
                }

                if (getNote(event.keyCode)) {
                    currentNote = getNote(event.keyCode);
                } else if (getDirection(event.keyCode)) {
                    currentDirection = getDirection(event.keyCode);
                } else if (getAction(event.keyCode)) {
                    currentAction = getAction(event.keyCode);
                }
            };

            document.onkeyup = function(event) {
                if (isGameKey(event.keyCode)) {
                    event.preventDefault();
                }

                if (getDirection(event.keyCode) === currentDirection) {
                    currentDirection = 0;
                } else if (getAction(event.keyCode) === currentAction) {
                    currentAction = null;
                } else if (getNote(event.keyCode) === currentNote) {
                    currentNote = null;
                }
            };

            self.getNote = function() {
                return currentNote;
            };

            self.getDirection = function() {
                return currentDirection;
            };

            self.getAction = function() {
                return currentAction;
            };

            self.clearAction = function() {
                currentAction = null;
            };

            return self;
        }
    };
});
