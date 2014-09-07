define(['models/ball', 'data/dimensions', 'models/fixtures', 'models/physics'], function(ball, d, fixtures, physics) {
    describe('ball', function() {
        var stubNormal = null;
        var paddle = {
            x: d.WIDTH / 2,
            top: d.HEIGHT - d.BORDER
        };
        var model;
        var objects;

        beforeEach(function() {
            var stubPaddle = physics.createPlane([0, -1], d.HEIGHT - d.BORDER, function() {
                    return stubNormal;
                });
            objects = fixtures.init().getCollisionObjects().concat([stubPaddle]);
            model = ball.init(paddle, objects);
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
                expect(getDistanceTravelled()).toBeCloseTo(previousDistance, 1);

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

                expect(model.y).toBeGreaterThan(d.BORDER);
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
                expect(model.y).toBeCloseTo(paddle.top - d.BALL.RADIUS);
            });
            
            it('collides edge-to-edge with the paddle', function() {
                model.update(100, 'LAUNCH');
                stubNormal = [0, -1];

                model.update(100);
                var line = model.y;
                while (model.y <= line) {
                    model.update(100);
                }
                var maxY = 0;
                while (model.y > line) {
                    model.update(1);
                    maxY = Math.max(maxY, model.y);
                }

                expect(maxY).toBeLessThan(paddle.top - d.BALL.RADIUS);
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

                expect(model.x).toBeLessThan(d.WIDTH);
            });

            it('bounces off the left edge of the screen', function() {
                model.update(100, 'LAUNCH');
                stubNormal = [-1 / Math.sqrt(2), -1 / Math.sqrt(2)];

                for (var i = 0; i < 100; ++i) {
                    model.update(100);
                }

                expect(model.x).toBeGreaterThan(0);
            });
            
            it('bounces off the corners of blocks', function() {
                model.update(100, 'LAUNCH');
                model.update(100);
                model.update(100);

                var collided = false;
                var point = physics.createPoint(
                    model.x - d.BALL.RADIUS / 2, model.y - 100,
                    function() { collided = true; return true; }
                );
                
                objects.push(point);
                
                while(!collided) {
                    model.update(20);
                }
                
                model.update(100);
                expect(model.x).toBeGreaterThan(point.position()[0]);
            });
            
            it('bounces off previously irrelevant very nearby planes', function() {
                model.update(100, 'LAUNCH');
                model.update(100);

                var collided = false;
                var newPlane = physics.createPlane([0, 1], model.y - d.BALL.RADIUS / 2, function() {
                    collided = true;
                    return [0, 1];
                });
                objects.push(newPlane);
                
                model.update(100);
                
                expect(collided).toBe(true);
            });
            
            it('maintains speed through collision with plane', function() {
                model.update(100, 'LAUNCH');
                var prevY = model.y;
                model.update(100);
                var prevDistance = Math.abs(model.y - prevY);

                var collided = false;
                var newPlane = physics.createPlane([0, 1], model.y - d.WIDTH / 4, function() {
                    collided = true;
                    return [0, 1];
                });
                objects.push(newPlane);

                while (!collided) {
                    prevY = model.y;
                    model.update(100);
                }
                
                var effectivePlaneY = newPlane.position()[1] + d.BALL.RADIUS;
                expect(prevY - effectivePlaneY + model.y - effectivePlaneY).toBeCloseTo(prevDistance, 8);
            });
        });
    });
});
