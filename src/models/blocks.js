define(['data/constants'], function(constants) {
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

        var left = constants.BLOCK.MARGIN.X + (constants.BLOCK.SPACING.X - constants.BLOCK.SIZE.X) / 2;
        var top = constants.BLOCK.MARGIN.Y;

        var addIndices = function(blocks) {
            for (var col = 0; col < blocks[0].length; ++col) {
                for (var row = blocks.length - 1; row >= 0; --row) {
                    blocks[row][col].x = left + col * constants.BLOCK.SPACING.X;
                    blocks[row][col].y = top + row * constants.BLOCK.SPACING.Y;
                }
            }
            return blocks;
        };

        var all = addIndices(adjustNotes(data.map(function(line) {
            return line.map(blockForNote);
        })));

        return {
            all: all,
            getTarget: function(x, y) {
                var left = constants.BLOCK.MARGIN.X;
                var top = constants.BLOCK.MARGIN.Y -
                    (constants.BLOCK.SPACING.Y - constants.BLOCK.SIZE.Y) / 2;

                var col = Math.floor((x - left) / constants.BLOCK.SPACING.X);
                var row = Math.floor((y - top) / constants.BLOCK.SPACING.Y);

                if (row >= 0 && row < all.length) {
                    if (col>= 0 && col < all[row].length) {
                        return all[row][col];
                    }
                }

                return null;
            }
        };
    };

    return {
        load: loadLevel
    }
});
