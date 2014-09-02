define(['models/blocks', 'data/constants'], function(blocks, constants) {
    function getNotes(fromBlocks) {
        return fromBlocks.map(function (row) {
            return row.map(function (block) {
                return block.midiNote
            })
        });
    }

    describe('load', function() {
        var rootNote = 60;

        it('generates a block for each data point', function() {
            var data = [[1, 2], [3, 4]];
            var model = blocks.load(data, rootNote);

            for (var i = 0; i < data.length; ++i) {
                expect(model.all[i].length).toBe(data[i].length);
            }
        });

        it('stores the original note against each block', function() {
            var model = blocks.load([[1, 2], [3, 4]], rootNote);

            expect(model.all[0][0].note).toBe(1);
            expect(model.all[0][1].note).toBe(2);
            expect(model.all[1][0].note).toBe(3);
            expect(model.all[1][1].note).toBe(4);
        });

        it('stores row and column against each block', function() {
            var data = [[1, 2], [3, 4]];
            var model = blocks.load(data, rootNote);

            for (var i = 0; i < model.all.length; ++i) {
                for (var j = 0; j < model.all[i].length; ++j) {
                    expect(model.all[i][j].row).toBe(i);
                    expect(model.all[i][j].col).toBe(j);
                }
            }
        });

        it('translates scale degrees to corresponding midi notes correctly', function() {
            var model = blocks.load([
                [7, 6.5],
                [6, 5.5],
                [5, 4.5],
                [4, 3],
                [2.5, 2],
                [1.5, 1]
            ], rootNote);

            expect(getNotes(model.all)).toEqual([
                [71, 70],
                [69, 68],
                [67, 66],
                [65, 64],
                [63, 62],
                [61, 60]
            ]);
        });

        it('ensures higher blocks always have higher notes, by changing octave', function() {
            var model = blocks.load([
                [1, 5],
                [5, 3],
                [3, 1],
                [7, 5],
                [5, 3],
                [1, 1]
            ], rootNote);

            expect(getNotes(model.all)).toEqual([
                [84, 79],
                [79, 76],
                [76, 72],
                [71, 67],
                [67, 64],
                [60, 60]
            ]);
        });
    });

    describe('getTarget', function() {
        var level;

        beforeEach(function() {
            level = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
        });

        it('returns null if no block nearby', function() {
            var model = blocks.load(level, 0);

            var result = model.getTarget(constants.WIDTH / 2, constants.HEIGHT - constants.BORDER);

            expect(result).toBeNull();
        });

        it('returns the block in the area of the point specified', function() {
            level[2][4] = 1.5;
            var model = blocks.load(level, 0);

            var result = model.getTarget(240, 160); //TODO: This will fail if the scale factor changes

            expect(result.midiNote).toBe(1);
        });
    });
});
