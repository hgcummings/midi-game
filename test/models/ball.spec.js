define(['models/ball', 'data/constants'], function(ball, constants) {
    describe('ball', function() {
        var stubNormal = null;
        var paddle = {
             x: constants.WIDTH / 2,
             top: constants.HEIGHT - constants.BORDER,
             getNormalAt: function() {
                 return stubNormal;
             }
        };
        var model;

        beforeEach(function() {
            model = ball.init(paddle);
        });

        describe('init', function() {
            it('starts off alive', function() {
                expect(model.alive).toBe(true);
            });
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
                for (var i = 0; i < 100; ++i) {
                    model.update(100);
                }

                expect(model.y).toBeGreaterThan(constants.BORDER);
            });

            it('bounces off the paddle', function() {
                model.update(100, 'LAUNCH');
                stubNormal = [0, -1];
                for (var i = 0; i < 100; ++i) {
                    model.update(100);
                }

                expect(model.y).toBeLessThan(paddle.top);
            });

            it('bounces off angled part of paddle', function() {
                model.update(100, 'LAUNCH');
                stubNormal = [1 / Math.sqrt(2), -1 / Math.sqrt(2)];

                model.update(100);
                var line = model.y;
                while (model.y <= line) {
                    model.update(100);
                }
                model.update(100);
                model.update(100);
                model.update(100);

                expect(model.x).toBeGreaterThan(paddle.x);
                expect(model.y).toBeCloseTo(paddle.top);
            });

            it('dies if it misses the paddle', function() {
                model.update(100, 'LAUNCH');
                stubNormal = null;
                for (var i = 0; i < 100; ++i) {
                    model.update(100);
                }

                expect(model.alive).toBe(false);
            });

            it('bounces off the right edge of the screen', function() {
                model.update(100, 'LAUNCH');
                stubNormal = [1 / Math.sqrt(2), -1 / Math.sqrt(2)];

                for (var i = 0; i < 100; ++i) {
                    model.update(100);
                }

                expect(model.x).toBeLessThan(constants.WIDTH);
            });

            it('bounces off the left edge of the screen', function() {
                model.update(100, 'LAUNCH');
                stubNormal = [-1 / Math.sqrt(2), -1 / Math.sqrt(2)];

                for (var i = 0; i < 100; ++i) {
                    model.update(100);
                }

                expect(model.x).toBeGreaterThan(0);
            });
        });
    });
});
