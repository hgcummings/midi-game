define(['data/dimensions', 'models/physics', 'output/sound'], function(d, physics, sound) {
    'use strict';
    var loadLevel = function(data, output) {
        var left = d.BLOCK.MARGIN.X;
        var top = d.BLOCK.MARGIN.Y;

        var gap = (d.WIDTH - 2 * d.BLOCK.MARGIN.X) / (4 * data[0].length + data[0].length - 1);

        var width = Math.round(gap * 4);
        var height = Math.round(width / d.BLOCK.RATIO);

        var spacingX = Math.round(gap * 5);
        var spacingY = Math.round((d.HEIGHT - (3 * d.BLOCK.MARGIN.Y)) / data.length);

        var columnLeft = function(col) {
            return left + col * spacingX;
        };

        var rowTop = function(row) {
            return top + row * spacingY;
        };

        var getColumn = function(blocks, x) {
            var withinBlock = ((x - left) % spacingX) <= width;
            if (withinBlock) {
                var columnIndex = Math.floor((x - left) / spacingX);
                if (columnIndex >= 0 && columnIndex < blocks[0].length) {
                    return columnIndex;
                }
            }
            return null;
        };

        var processHit = function(block, time, note) {
            if (!block.hit) {
                if (note === true || block.note === note) {
                    output.playHit(block.midiNote);
                    block.hit = time;
                    return note === true;
                } else {
                    output.playBounce(block.midiNote);
                    return true;
                }
            }
        };

        function createPlanes(blocks) {
            var planes = [];

            var getRow = function(y) {
                var withinBlock = ((y - top) % spacingY) <= height;
                if (withinBlock) {
                    var rowIndex = Math.floor((y - top) / spacingY);
                    if (rowIndex >= 0 && rowIndex < blocks.length) {
                        return rowIndex;
                    }
                }
                return null;
            };

            var createHorizontalPlane = function(row, normalY) {
                return physics.createPlane(
                    'BLOCK',
                    [0, normalY],
                    rowTop(row) + height * (normalY + 1) / 2,
                    function(x, y, t, note) {
                        var col = getColumn(blocks, x);
                        if (col !== null && processHit(blocks[row][col], t, note)) {
                            return [0, normalY];
                        }
                        return null;
                    }
                );
            };

            var createVerticalPlane = function(col, normalX) {
                return physics.createPlane(
                    'BLOCK',
                    [normalX, 0],
                    columnLeft(col) + width * (normalX + 1) / 2,
                    function(x, y, t, note) {
                        var row = getRow(y);
                        if (row !== null && processHit(blocks[row][col], t, note)) {
                            return [normalX, 0];
                        }
                        return null;
                    }
                );
            };

            for (var row = 0; row < blocks.length; ++row) {
                planes.push(createHorizontalPlane(row, -1));
                planes.push(createHorizontalPlane(row, 1));
            }

            for (var col = 0; col < blocks[0].length; ++col) {
                planes.push(createVerticalPlane(col, -1));
                planes.push(createVerticalPlane(col, 1));
            }
            return planes;
        }

        var createPoints = function(blocks) {
            var points = [];

            var createPointsForBlock = function(block) {
                var collide = function(x, y, t, note) {
                    return processHit(block, t, note);
                };
                points.push(physics.createPoint(
                    'BLOCK', block.x, block.y, collide));
                points.push(physics.createPoint(
                    'BLOCK', block.x + width, block.y, collide));
                points.push(physics.createPoint(
                    'BLOCK', block.x, block.y + height, collide));
                points.push(physics.createPoint(
                    'BLOCK', block.x + width, block.y + height, collide));
            };

            for (var row = 0; row < blocks.length; ++row) {
                for (var col = 0; col < blocks[row].length; ++col) {
                    createPointsForBlock(blocks[row][col]);
                }
            }

            return points;
        };

        var getIntersection = function(x, start, end) {
            var column = getColumn(all, x);
            if (column !== null) {
                var topRow = Math.max(0, Math.floor(
                    (start - top + (spacingY - height)) / spacingY));
                if (topRow < all.length) {
                    var bottomRow = Math.min(all.length - 1, (end - top) / spacingY);
                    if (bottomRow >= 0) {
                        var intersecting = [];
                        for (var row = topRow; row <= bottomRow; ++row) {
                            intersecting.push(all[row][column]);
                        }
                        return intersecting;
                    }
                }
            }
            return [];
        };

        var blockForNote = function(note) {
            return {
                note: note,
                midiNote: sound.getMidiNote(note)
            };
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

        var addCoordinates = function(blocks) {
            for (var col = 0; col < blocks[0].length; ++col) {
                for (var row = blocks.length - 1; row >= 0; --row) {
                    blocks[row][col].x = columnLeft(col);
                    blocks[row][col].y = rowTop(row);
                }
            }
            return blocks;
        };

        var all = addCoordinates(adjustNotes(data.map(function(line) {
            return line.map(blockForNote);
        })));

        var planes = createPlanes(all);
        var points = createPoints(all);

        return {
            all: all,
            blockWidth: width,
            blockHeight: height,
            getCollisionObjects: function() { return planes.concat(points); },
            getCollisionPlanes: function() { return planes; },
            getCollisionPoints: function() { return points; },
            getIntersection: getIntersection
        };
    };

    return {
        init: loadLevel
    };
});
