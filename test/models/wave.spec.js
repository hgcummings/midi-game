define(['models/wave', 'data/dimensions'], function(wave, d) {
    'use strict';
    describe('wave', function() {
        var model;
        var stubPaddle;
        var intersectingBlocks;
        var playedNotes;
        var stoppedNotes;

        beforeEach(function() {
            stubPaddle = {
                x: d.WIDTH / 2,
                top: d.HEIGHT - d.BORDER
            };
            intersectingBlocks = [];
            playedNotes = [];
            stoppedNotes = [];
            model = wave.init(stubPaddle, {
                getIntersection: function() { return intersectingBlocks; }
            }, {
                startNote: function(note) {
                    playedNotes.push(note);
                    return { stop: function() { stoppedNotes.push(note); } };
                }
            });
        });

        it('locks position to the paddle', function() {
            stubPaddle.x = d.WIDTH / 4;

            model.update(500);

            expect(model.x).toBe(stubPaddle.x);
        });

        it('grows from bottom to top', function() {
            expect(model.top).toBe(stubPaddle.top);
            expect(model.bottom).toBe(stubPaddle.top);

            model.update(500);

            expect(model.bottom).toBe(stubPaddle.top);
            expect(model.top).toBeLessThan(stubPaddle.top);
        });

        it('stops growing at the top of the screen', function() {
            while (model.top > d.BLOCK.MARGIN.Y) {
                model.update(500);
            }

            for (var i = 0; i < 4; ++i) {
                model.update(500);
            }

            expect(model.top).toBe(d.BORDER);
        });

        it('shrinks from bottom to top at a slower rate', function() {
            var initial = model.top;
            model.update(500);
            var growthSpeed = Math.abs(model.top - initial);

            while (model.top > d.BLOCK.MARGIN.Y) {
                model.update(500);
            }

            model.update(500);
            model.update(500);
            expect(model.bottom).toBeLessThan(initial);
            initial = model.bottom;
            model.update(500);
            var shrinkSpeed = Math.abs(model.bottom - initial);

            expect(shrinkSpeed).toBeLessThan(growthSpeed);
        });

        it('dies when shrunk to nothing', function() {
            while (model.bottom > d.BLOCK.MARGIN.Y) {
                model.update(500);
            }

            for (var i = 0; i < 4; ++i) {
                model.update(500);
            }

            expect(model.alive).toBe(false);
        });

        it('starts playing notes of intersecting blocks', function() {
            intersectingBlocks.push({ midiNote: 60 });
            model.update(100);
            expect(playedNotes.length).toBe(1);
            expect(playedNotes[0]).toBe(60);
        });

        it('stops playing notes of previously intersecting blocks', function() {
            intersectingBlocks.push({ midiNote: 60 });
            model.update(100);
            intersectingBlocks = [];
            model.update(100);
            expect(playedNotes.length).toBe(1);
            expect(playedNotes[0]).toBe(60);
            expect(stoppedNotes.length).toBe(1);
            expect(stoppedNotes[0]).toBe(60);
        });

        it('continues playing notes of still intersecting blocks', function() {
            intersectingBlocks.push({ midiNote: 60 });
            model.update(100);
            model.update(100);
            expect(playedNotes.length).toBe(1);
            expect(playedNotes[0]).toBe(60);
            expect(stoppedNotes.length).toBe(0);
        });

        it('does not play notes of already hit blocks', function() {
            intersectingBlocks.push({ midiNote: 60, hit: 1000 });
            model.update(100);
            expect(playedNotes.length).toBe(0);
        });
    });
});