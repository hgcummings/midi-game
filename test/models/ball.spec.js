define(['models/ball', 'data/constants'], function(ball, constants) {
    describe('ball', function() {
        var paddle = { x: constants.WIDTH / 2 };
        var model;

        beforeEach(function() {
            model = ball.init(paddle);
        });

        describe('update', function() {
            it('flies upward with constant speed when launched', function() {
                var previousPosition = model.y;
                model.update(100, 'LAUNCH');
                var previousDistance = getDistanceTravelled();
                expect(previousDistance).toBeLessThan(0);
                expect(getDistanceTravelled()).toBe(previousDistance);

                function getDistanceTravelled() {
                    var startPos = model.y;
                    model.update(100);
                    return model.y - startPos;
                }
            });

            it('bounces off the top border of the screen', function() {
                model.update(100, 'LAUNCH');
                for (var i = 0; i < 10; ++i) {
                    model.update(1000);
                }

                expect(model.y).toBeGreaterThan(constants.BORDER);
            });
        });
    });
});
