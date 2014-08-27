define(function() {
    var scaleDegrees = [1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7];
    
    var loadLevel = function(data, baseNote) {
        
        var blockForNote = function(note) {
            return {
                note: note,
                midiNote: baseNote + scaleDegrees.indexOf(note)
            }
        };
        
        var adjustNotes = function(blocks) {
            var octaveAdjust = true, prevNote, col, row;

            while (octaveAdjust) {
                octaveAdjust = false;
                for (col = 0; col < blocks[0].length; ++col) {
                    prevNote = 0;
                    for (row = blocks.length - 1; row >= 0; --row) {
                        if (blocks[row][col].midiNote < prevNote) {
                            blocks[row][col].midiNote += 12;
                            octaveAdjust = true;
                        }
                        prevNote = blocks[row][col].midiNote;
                    }
                }
            }
            
            return blocks;
        };
        
        return adjustNotes(data.map(function(line) {
            return line.map(blockForNote);
        }));
    };
    
    return {
        load: loadLevel
    }
});
