define(function() {
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
    
    return {
        init: function() {
            var self = {};
            var currentNote = null;
            var currentDirection = 0;
            
            var getNote = function(keyCode) {
                return noteMap[keyCode];
            };
            
            var getDirection = function(keyCode) {
                if (event.keyCode === 191) {
                    return 1;
                } else if (event.keyCode === 90) {
                    return -1;
                }
            };
            
            document.onkeydown = function(event) {
                if (getNote(event.keyCode)) {
                    currentNote = getNote(event.keyCode);
                } else if (getDirection(event.keyCode)) {
                    currentDirection = getDirection(event.keyCode);
                }
            };

            document.onkeyup = function(event) {
                if (getNote(event.keyCode) === currentNote) {
                    currentNote = null;
                } else if (getDirection(event.keyCode)) {
                    currentDirection = 0;
                }
            };
                        
            self.getNote = function() {
                return currentNote;
            };
            
            self.getDirection = function() {
                return currentDirection;
            };
            
            return self;
        }
    }
});
