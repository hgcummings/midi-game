define(['models/ball', 'data/constants', 'models/fixtures'], function(ball, constants, fixtures) {
    describe('ball', function() {
        var stubNormal = null;
        var paddle = {
            x: constants.WIDTH / 2,
            top: constants.HEIGHT - constants.BORDER
        };
        var model;

        beforeEach(function() {
            model = ball.init(paddle, fixtures.init().getCollisionPlanes().concat([{
                normal: [0, -1],
                position: [0, constants.HEIGHT - constants.BORDER],
                collideAt: function() {
                    return stubNormal;
                }
            }]));
        });

        describe('init', function() {
            it('starts off alive', function() {
                expect(model.alive).toBe(true);
            });
        });

        describe('update', function() {
            it('flies upward with constant speed when launched', function() {
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

            it('ceases interacting with the paddle after passing below it', function() {
                model.update(100, 'LAUNCH');
                while (model.y < paddle.top) {
                    model.update(100);
                }
                stubNormal = [0, -1];
                model.update(100);
                model.update(100);

                expect(model.y).toBeGreaterThan(paddle.top);
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
            
//            it('bounces off the edges of blocks', function() {
//                model.update(100, 'LAUNCH');
//                
//                
//            });
        });
    });
});
