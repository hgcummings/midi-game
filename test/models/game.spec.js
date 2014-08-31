define(['models/game', 'data/constants'], function(game, constants) {
    describe('init', function() {
        var level = [[]];
        var model;
        var stubDirection = 0;
        var stubInput = {
            getDirection: function() {
                return stubDirection;
            }
        };

        beforeEach(function() {
            model = game.init(level, stubInput);
            model.update(0);
        });

        describe('paddle', function() {
            it('starts stationary in the center of the screen', function() {
                expect(model.paddle.x).toBe(constants.WIDTH / 2);
                model.update(1000);
                expect(model.paddle.x).toBe(constants.WIDTH / 2);
            });

            it('moves in response to user input', function() {
                var previousPosition, currentPosition;

                previousPosition = model.paddle.x;
                stubDirection = 1;
                model.update(1000);
                currentPosition = model.paddle.x;

                expect(currentPosition).toBeGreaterThan(previousPosition);

                previousPosition = currentPosition;
                stubDirection = -1;
                model.update(2000);
                currentPosition = model.paddle.x;

                expect(currentPosition).toBeLessThan(previousPosition);
            });

            it('moves at constant speed', function() {
                var positions = [model.paddle.x];

                stubDirection = 1;
                for (var i = 1; i < 10; ++i) {
                    model.update(i * 100);
                    positions[i] = model.paddle.x;
                }

                for (i = 2; i < positions.length; ++i) {
                    expect(Math.round(positions[i] - positions[i-1])).toBe(
                        Math.round(positions[i-1] - positions[i-2]));
                }
            });

            it('stops at the left edge of the screen', function() {
                stubDirection = -1;

                for (var i = 1; i < 10; ++i) {
                    model.update(i * 1000);
                }

                expect(model.paddle.x).toBeGreaterThan(0);
            });

            it('stops at the right edge of the screen', function() {
                stubDirection = 1;

                for (var i = 1; i < 10; ++i) {
                    model.update(i * 1000);
                }

                expect(model.paddle.x).toBeLessThan(constants.WIDTH);
            });
        });
    });
});
