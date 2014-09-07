define(['models/blocks', 'data/dimensions'], function(blocks, d) {
    function getNotes(fromBlocks) {
        return fromBlocks.map(function (row) {
            return row.map(function (block) {
                return block.midiNote;
            });
        });
    }

    describe('load', function() {
        var rootNote = 60;

        it('generates a block for each data point', function() {
            var data = [[1, 2], [3, 4]];
            var model = blocks.init(data, rootNote);

            for (var i = 0; i < data.length; ++i) {
                expect(model.all[i].length).toBe(data[i].length);
            }
        });

        it('stores the original note against each block', function() {
            var model = blocks.init([[1, 2], [3, 4]], rootNote);

            expect(model.all[0][0].note).toBe(1);
            expect(model.all[0][1].note).toBe(2);
            expect(model.all[1][0].note).toBe(3);
            expect(model.all[1][1].note).toBe(4);
        });

        it('stores position against each block', function() {
            var data = [[1, 2], [3, 4]];
            var model = blocks.init(data, rootNote);

            expect(model.all[0][0].x).toBe(
                d.BLOCK.MARGIN.X + (d.BLOCK.SPACING.X - d.BLOCK.SIZE.X) / 2);
            expect(model.all[0][0].y).toBe(d.BLOCK.MARGIN.Y);
        });
        it('translates scale degrees to corresponding midi notes correctly', function() {
            var model = blocks.init([
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
            var model = blocks.init([
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
    
    describe('getCollisionObjects', function() {
        var model;
        var planes;
        
        beforeEach(function() {
            model = blocks.init([
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]);
        });
        
        it('returns a plane for each line of block edges', function() {
            var planes = model.getCollisionPlanes();
            
            expect(planes.length).toBe(32 + 12);
        });
        
        it('returns horizontal planes for the top of each row', function() {
            var topPlanes = model.getCollisionPlanes().filter(function(plane) { return plane.positionNormal()[1] === -1; });
            
            expect(topPlanes.length).toBe(6);
        });

        it('returns horizontal planes for the bottom of each row', function() {
            var bottomPlanes = model.getCollisionPlanes().filter(function(plane) { return plane.positionNormal()[1] === 1; });

            expect(bottomPlanes.length).toBe(6);
        });

        it('returns vertical planes for the left of each row', function() {
            var leftPlanes = model.getCollisionPlanes().filter(function(plane) { return plane.positionNormal()[0] === -1; });

            expect(leftPlanes.length).toBe(16);
        });

        it('returns vertical planes for the right of each row', function() {
            var rightPlanes = model.getCollisionPlanes().filter(function(plane) { return plane.positionNormal()[0] === 1; });

            expect(rightPlanes.length).toBe(16);
        });
        
        describe('returns collisions with blocks', function() {
            var block;
            
            beforeEach(function() {
                block = model.all[3][8];
            });
            
            it('from top', function() {
                expect(topPlaneFor(block).collideAt(topEdgeOf(block)[0], topEdgeOf(block)[1])).toEqual([0, -1]);
            });

            it('from bottom', function() {
                expect(bottomPlaneFor(block).collideAt(bottomEdgeOf(block)[0], bottomEdgeOf(block)[1])).toEqual([0, 1]);
            });

            it('from left', function() {
                expect(leftPlaneFor(block).collideAt(leftEdgeOf(block)[0], leftEdgeOf(block)[1])).toEqual([-1, 0]);
            });

            it('from right', function() {
                expect(rightPlaneFor(block).collideAt(rightEdgeOf(block)[0], rightEdgeOf(block)[1])).toEqual([1, 0]);
            });
        });

        describe('records collisions against blocks', function() {
            var block;
            var gameTime = 1000;

            beforeEach(function() {
                block = model.all[3][8];
                expect(block.hit).toBeFalsy();
            });

            it('from top', function() {
                topPlaneFor(block).collideAt(topEdgeOf(block)[0], topEdgeOf(block)[1], gameTime);
                expect(block.hit).toBe(gameTime);
            });

            it('from bottom', function() {
                bottomPlaneFor(block).collideAt(bottomEdgeOf(block)[0], bottomEdgeOf(block)[1], gameTime);
                expect(block.hit).toBe(gameTime);
            });

            it('from left', function() {
                leftPlaneFor(block).collideAt(leftEdgeOf(block)[0], leftEdgeOf(block)[1], gameTime);
                expect(block.hit).toBe(gameTime);
            });

            it('from right', function() {
                rightPlaneFor(block).collideAt(rightEdgeOf(block)[0], rightEdgeOf(block)[1], gameTime);
                expect(block.hit).toBe(gameTime);
            });
        });

        describe('returns collisions with blocks in first column', function() {
            var block;

            beforeEach(function() {
                block = model.all[5][0];
            });

            it('from top', function() {
                expect(topPlaneFor(block).collideAt(topEdgeOf(block)[0], topEdgeOf(block)[1])).toEqual([0, -1]);
            });

            it('from bottom', function() {
                expect(bottomPlaneFor(block).collideAt(bottomEdgeOf(block)[0], bottomEdgeOf(block)[1])).toEqual([0, 1]);
            });

            it('from left', function() {
                expect(leftPlaneFor(block).collideAt(leftEdgeOf(block)[0], leftEdgeOf(block)[1])).toEqual([-1, 0]);
            });

            it('from right', function() {
                expect(rightPlaneFor(block).collideAt(rightEdgeOf(block)[0], rightEdgeOf(block)[1])).toEqual([1, 0]);
            });
        });

        describe('does not return collisions for already hit blocks', function() {
            var block;

            beforeEach(function() {
                block = model.all[3][8];
                block.hit = true;
            });

            it('from top', function() {
                expect(topPlaneFor(block).collideAt(topEdgeOf(block)[0], topEdgeOf(block)[1])).toBeNull();
            });

            it('from bottom', function() {
                expect(bottomPlaneFor(block).collideAt(bottomEdgeOf(block)[0], bottomEdgeOf(block)[1])).toBeNull();
            });

            it('from left', function() {
                expect(leftPlaneFor(block).collideAt(leftEdgeOf(block)[0], leftEdgeOf(block)[1])).toBeNull();
            });

            it('from right', function() {
                expect(rightPlaneFor(block).collideAt(rightEdgeOf(block)[0], rightEdgeOf(block)[1])).toBeNull();
            });
        });

        it('does not return collisions between blocks', function() {
            var block = model.all[3][8];

            expect(topPlaneFor(block)
                .collideAt(topEdgeOf(block)[0] + d.BLOCK.SPACING.X / 2, topEdgeOf(block)[1]))
                .toBeNull();
            expect(bottomPlaneFor(block)
                .collideAt(bottomEdgeOf(block)[0] + d.BLOCK.SPACING.X / 2, bottomEdgeOf(block)[1]))
                .toBeNull();
            expect(leftPlaneFor(block)
                .collideAt(leftEdgeOf(block)[0], leftEdgeOf(block)[1] + d.BLOCK.SPACING.Y / 2))
                .toBeNull();
            expect(rightPlaneFor(block)
                .collideAt(rightEdgeOf(block)[0], rightEdgeOf(block)[1] + d.BLOCK.SPACING.Y / 2))
                .toBeNull();
        });

        function topPlaneFor(block) {
            var topPlanes = model.getCollisionPlanes().filter(
                function(plane) { return plane.position()[1] === block.y; });
            expect(topPlanes.length).toBe(1);
            return topPlanes[0];
        }

        function bottomPlaneFor(block) {
            var bottomPlanes = model.getCollisionPlanes().filter(
                function(plane) { return plane.position()[1] === block.y + d.BLOCK.SIZE.Y; });
            expect(bottomPlanes.length).toBe(1);
            return bottomPlanes[0];
        }

        function leftPlaneFor(block) {
            var leftPlanes = model.getCollisionPlanes().filter(
                function(plane) { return plane.position()[0] === block.x; });
            expect(leftPlanes.length).toBe(1);
            return leftPlanes[0];
        }

        function rightPlaneFor(block) {
            var rightPlanes = model.getCollisionPlanes().filter(
                function(plane) { return plane.position()[0] === block.x + d.BLOCK.SIZE.X; });
            expect(rightPlanes.length).toBe(1);
            return rightPlanes[0];
        }

        function topEdgeOf(block) {
            return [block.x + d.BLOCK.SIZE.X / 2, block.y];
        }

        function bottomEdgeOf(block) {
            return [block.x + d.BLOCK.SIZE.X / 2, block.y + d.BLOCK.SIZE.Y];
        }

        function leftEdgeOf(block) {
            return [block.x, block.y + d.BLOCK.SIZE.Y / 2];
        }

        function rightEdgeOf(block) {
            return [block.x + d.BLOCK.SIZE.X, block.y + d.BLOCK.SIZE.Y / 2];
        }
    });

    describe('getCollisionPoints', function() {
        var model;

        beforeEach(function() {
            model = blocks.init([
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]);
        });

        it('returns a point for each active block vertex', function() {
            var points = model.getCollisionPoints();

            expect(points.length).toBe(16 * 6 * 4);
        });

        it('positions the points at block vertices', function() {
            var block = model.all[0][0];
            var topLeft = pointsMatching(block.x, block.y);
            var topRight = pointsMatching(block.x + d.BLOCK.SIZE.X, block.y);
            var bottomLeft = pointsMatching(block.x, block.y + d.BLOCK.SIZE.Y);
            var bottomRight = pointsMatching(block.x + d.BLOCK.SIZE.X, block.y + d.BLOCK.SIZE.Y);
            
            expect(topLeft.length).toBe(1);
            expect(topRight.length).toBe(1);
            expect(bottomLeft.length).toBe(1);
            expect(bottomRight.length).toBe(1);
        });

        it('positions the points at block vertices', function() {
            var block = model.all[0][0];
            var topLeft = pointsMatching(block.x, block.y);
            var topRight = pointsMatching(block.x + d.BLOCK.SIZE.X, block.y);
            var bottomLeft = pointsMatching(block.x, block.y + d.BLOCK.SIZE.Y);
            var bottomRight = pointsMatching(block.x + d.BLOCK.SIZE.X, block.y + d.BLOCK.SIZE.Y);

            expect(topLeft.length).toBe(1);
            expect(topRight.length).toBe(1);
            expect(bottomLeft.length).toBe(1);
            expect(bottomRight.length).toBe(1);
        });
        
        it('returns collisions with blocks', function() {
            var block = model.all[3][8];
            var point = pointsMatching(block.x, block.y)[0];

            var result = point.collideAt(block.x, block.y);
            expect(result).toBeTruthy();
        });
        
        it('records collisions against blocks', function() {
            var block = model.all[3][8];
            var point = pointsMatching(block.x, block.y)[0];
            var gameTime = 1000;
            expect(block.hit).toBeFalsy();

            point.collideAt(block.x, block.y, gameTime);
            
            expect(block.hit).toBe(gameTime);
        });

        it('does not return collisions for already hit blocks', function() {
            var block = model.all[3][8];
            var point = pointsMatching(block.x, block.y)[0];
            block.hit = true;

            var result = point.collideAt(block.x, block.y);
            expect(result).toBeFalsy();
        });
        
        function pointsMatching(x, y) {
            return model.getCollisionPoints().filter(
                function(point) { return point.position()[0] === x && point.position()[1] === y; });
        }
    });
});
