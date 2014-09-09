define(['models/ball', 'data/dimensions', 'models/fixtures', 'models/physics'], function(ball, d, fixtures, physics) {
    describe('ball', function() {
        var stubNormal = null;
        var paddle = {
            x: d.WIDTH / 2,
            top: d.HEIGHT - d.BORDER
        };
        var model;
        var objects;
        var stubNote;
        var bounceNoteSpy;

        beforeEach(function() {
            stubNote = null;
            bounceNoteSpy = null;
            var stubPaddle = physics.createPlane('PADDLE', [0, -1], d.HEIGHT - d.BORDER, function() {
                    return stubNormal;
                });
            objects = fixtures.init().getCollisionObjects().concat([stubPaddle]);
            model = ball.init(paddle, objects, {
                getNote: function() { return stubNote; }
            }, {
                playBounce: function(note) { bounceNoteSpy = note; }
            });
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
                var point = physics.createPoint('BLOCK',
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
                var newPlane = physics.createPlane('BLOCK', [0, 1], model.y - d.BALL.RADIUS / 2, function() {
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
                var newPlane = physics.createPlane('BLOCK', [0, 1], model.y - d.WIDTH / 4, function() {
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

            it('passes note to collision function', function() {
                model.update(100, 'LAUNCH');
                var prevY = model.y;
                model.update(100);
                var actualNote = null;
                stubNote = 1;

                var collided = false;
                var newPlane = physics.createPlane('BLOCK', [0, 1], model.y - d.WIDTH / 4, function(x, y, t, note) {
                    collided = true;
                    actualNote = note;
                    return [0, 1];
                });
                objects.push(newPlane);

                while (!collided) {
                    prevY = model.y;
                    model.update(100);
                }

                expect(actualNote).toBe(stubNote);
            });
            
            it('plays its current note when bouncing off an object', function() {
                model.update(100, 'LAUNCH');
                
                stubNote = 1;
                
                for (var i = 0; i < 100; ++i) {
                    model.update(100);
                }

                expect(bounceNoteSpy).toBe(60);
            });

            it('does not play a note if no current note is selected', function() {
                model.update(100, 'LAUNCH');
                
                stubNote = null;
                
                for (var i = 0; i < 100; ++i) {
                    model.update(100);
                }

                expect(bounceNoteSpy).toBeNull();
            });
        });
        
        describe('modes', function() {
            describe('earth', function() {
                it('moves slower than a standard ball', function() {
                    model.update(100, 'LAUNCH');
                    var y1 = model.y;
                    model.update(100, 'EARTH');
                    var y2 = model.y;
                    model.update(100);
                    var y3 = model.y;

                    expect(Math.abs(Math.round(y3 - y2))).toBeLessThan(Math.abs(Math.round(y2 - y1)));
                });
                
                it('sticks to the paddle when caught', function() {
                    model.update(100, 'LAUNCH');
                    model.update(100, 'EARTH');
                    stubNormal = [0, -1];
                    for (var i = 0; i < 100; ++i) {
                        model.update(100);
                    }

                    expect(model.y).toEqual(paddle.top - d.BALL.RADIUS);
                    expect(model.released).toBe(false);
                });
            });
            
            describe('air', function() {
                it('does not pass note to collision function', function() {
                    model.update(100, 'LAUNCH');
                    model.update(100, 'AIR');
                    var actualNote = null;
                    stubNote = 1;

                    var collided = false;
                    var newPlane = physics.createPlane('BLOCK', [0, 1], model.y - d.WIDTH / 4, function(x, y, t, note) {
                        collided = true;
                        actualNote = note;
                        return [0, 1];
                    });
                    objects.push(newPlane);

                    while (!collided) {
                        model.update(100);
                    }

                    expect(actualNote).toBeFalsy();
                });

                it('does not bounce off blocks', function() {
                    model.update(100, 'LAUNCH');
                    model.update(100, 'AIR');

                    var collided = false;
                    var newPlane = physics.createPlane('BLOCK', [0, 1], model.y - d.WIDTH / 4, function() {
                        collided = true;
                        return [0, 1];
                    });
                    newPlane.type = 'BLOCK';
                    objects.push(newPlane);

                    while (!collided) {
                        model.update(100);
                    }

                    var effectivePlaneY = newPlane.position()[1] + d.BALL.RADIUS;
                    expect(model.y).toBeLessThan(effectivePlaneY);
                });

                it('does not play note on collision', function() {
                    model.update(100, 'LAUNCH');
                    model.update(100, 'AIR');

                    stubNote = 1;

                    for (var i = 0; i < 100; ++i) {
                        model.update(100);
                    }

                    expect(bounceNoteSpy).toBeFalsy();
                });

                it('moves faster than a standard ball', function() {
                    model.update(100, 'LAUNCH');
                    var y1 = model.y;
                    model.update(100, 'AIR');
                    var y2 = model.y;
                    model.update(100);
                    var y3 = model.y;

                    expect(Math.abs(Math.round(y3 - y2))).toBeGreaterThan(Math.abs(Math.round(y2 - y1)));
                });
            });
            
            describe('fire', function() {
                it('passes wildcard note to collision function', function() {
                    model.update(100, 'LAUNCH');
                    model.update(100, 'FIRE');
                    var actualNote = null;

                    var collided = false;
                    var newPlane = physics.createPlane('BLOCK', [0, 1], model.y - d.WIDTH / 4, function(x, y, t, note) {
                        collided = true;
                        actualNote = note;
                        return [0, 1];
                    });
                    objects.push(newPlane);

                    while (!collided) {
                        model.update(100);
                    }

                    expect(actualNote).toBe(true);
                });
                
                it('moves faster than a standard ball', function() {
                    model.update(100, 'LAUNCH');
                    var y1 = model.y;
                    model.update(100, 'FIRE');
                    var y2 = model.y;
                    model.update(100);
                    var y3 = model.y;
                    
                    expect(Math.abs(Math.round(y3 - y2))).toBeGreaterThan(Math.abs(Math.round(y2 - y1)));
                });

                it('does not play note on collision', function() {
                    model.update(100, 'LAUNCH');
                    model.update(100, 'FIRE');

                    stubNote = 1;

                    for (var i = 0; i < 100; ++i) {
                        model.update(100);
                    }

                    expect(bounceNoteSpy).toBeFalsy();
                });
            });
        });
    });
});
