define(['models/blocks'], function(level) {
    function getNotes(blocks) {
        return blocks.map(function (row) {
            return row.map(function (block) {
                return block.midiNote
            })
        });
    }

    describe('load', function() {
        var rootNote = 60;

        it('generates a block for each data point', function() {
            var data = [[1, 2], [3, 4]];
            var blocks = level.load(data, rootNote);

            for (var i = 0; i < data.length; ++i) {
                expect(blocks[i].length).toBe(data[i].length);
            }
        });

        it('stores the original note against each block', function() {
            var blocks = level.load([[1, 2], [3, 4]], rootNote);

            expect(blocks[0][0].note).toBe(1);
            expect(blocks[0][1].note).toBe(2);
            expect(blocks[1][0].note).toBe(3);
            expect(blocks[1][1].note).toBe(4);
        });

        it('translates scale degrees to corresponding midi notes correctly', function() {
            var blocks = level.load([
                [7, 6.5],
                [6, 5.5],
                [5, 4.5],
                [4, 3],
                [2.5, 2],
                [1.5, 1]
            ], rootNote);

            expect(getNotes(blocks)).toEqual([
                [71, 70],
                [69, 68],
                [67, 66],
                [65, 64],
                [63, 62],
                [61, 60]
            ]);
        });

        it('ensures higher blocks always have higher notes, by changing octave', function() {
            var blocks = level.load([
                [1, 5],
                [5, 3],
                [3, 1],
                [7, 5],
                [5, 3],
                [1, 1]
            ], rootNote);

            expect(getNotes(blocks)).toEqual([
                [84, 79],
                [79, 76],
                [76, 72],
                [71, 67],
                [67, 64],
                [60, 60]
            ]);
        });
    })
});
