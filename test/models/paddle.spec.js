define(['models/paddle', 'data/constants'], function(paddle, constants) {
    describe('paddle', function() {
        var model;

        beforeEach(function() {
            model = paddle.init();
        });

        describe('init', function() {
            it('starts stationary in the center of the screen', function() {
                expect(model.x).toBe(constants.WIDTH / 2);
                model.update(1000, 0);
                expect(model.x).toBe(constants.WIDTH / 2);
            });
        });

        describe('update', function() {
            it('moves in response to user input', function() {
                var previousPosition, currentPosition;

                previousPosition = model.x;
                model.update(1000, 1);
                currentPosition = model.x;

                expect(currentPosition).toBeGreaterThan(previousPosition);

                previousPosition = currentPosition;
                model.update(1000, -1);
                currentPosition = model.x;

                expect(currentPosition).toBeLessThan(previousPosition);
            });

            it('moves at constant speed', function() {
                var positions = [model.x];

                for (var i = 1; i < 10; ++i) {
                    model.update(100, 1);
                    positions[i] = model.x;
                }

                for (i = 2; i < positions.length; ++i) {
                    expect(Math.round(positions[i] - positions[i-1])).toBe(
                        Math.round(positions[i-1] - positions[i-2]));
                }
            });

            it('stops at the left edge of the screen', function() {
                for (var i = 1; i < 10; ++i) {
                    model.update(1000, 1);
                }

                expect(model.x).toBeGreaterThan(0);
            });

            it('stops at the right edge of the screen', function() {
                for (var i = 1; i < 10; ++i) {
                    model.update(1000, 1);
                }

                expect(model.x).toBeLessThan(constants.WIDTH);
            });
        });
    });
});
