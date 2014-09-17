define(['models/ball', 'data/dimensions', 'models/fixtures', 'models/maths', 'models/physics'], function(ball, d, fixtures, maths, physics) {
    'use strict';
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
        
        var createModel = function() {
            return ball.init(paddle, objects, {
                getNote: function() { return stubNote; }
            }, {
                playBounce: function(note) { bounceNoteSpy = note; }
            });
        };

        beforeEach(function() {
            stubNote = null;
            bounceNoteSpy = null;
            var stubPaddle = physics.createPlane('PADDLE', [0, -1], d.HEIGHT - d.BORDER, function() {
                    return stubNormal;
                });
            objects = fixtures.init().getCollisionObjects().concat([stubPaddle]);
            model = createModel();
        });

        describe('init', function() {
            it('starts off alive', function() {
                expect(model.alive).toBe(true);
            });
        });

        describe('update', function() {
            it('flies upward with constant speed when launched', function() {
                triggerLaunch();
                var initialV = measureVelocity();
                var currentV = measureVelocity();
                
                expect(initialV[0]).toBeLessThan(1);
                expect(initialV[1]).toBeLessThan(0);
                expect(currentV[1]).toBeCloseTo(initialV[1], 1);
            });

            it('bounces off the top border of the screen', function() {
                triggerLaunch();
                runToCollision();

                expect(model.y).toBeGreaterThan(d.BORDER);
            });
            
            it('bounces off the paddle', function() {
                triggerLaunch();
                stubNormal = [0, -1];
                runToCollision();

                expect(model.y).toBeLessThan(paddle.top);
            });

            it('bounces off angled part of paddle', function() {
                triggerLaunch();
                stubNormal = [1 / Math.sqrt(2), -1 / Math.sqrt(2)];

                runToCollision();
                runToCollision();

                expect(model.x).toBeGreaterThan(paddle.x);
                expect(model.y).toBeCloseTo(paddle.top - d.BALL.RADIUS);
            });
            
            it('collides edge-to-edge with the paddle', function() {
                triggerLaunch();
                stubNormal = [0, -1];

                model.update(100);
                var line = model.y;
                runToCollision();
                var maxY = 0;
                while (model.y > line) {
                    model.update(1);
                    maxY = Math.max(maxY, model.y);
                }

                expect(maxY).toBeLessThan(paddle.top - d.BALL.RADIUS);
            });

            it('dies if it misses the paddle', function() {
                triggerLaunch();
                stubNormal = null;
                for (var i = 0; i < 100; ++i) {
                    model.update(100);
                }

                expect(model.alive).toBe(false);
            });

            it('ceases interacting with the paddle after passing below it', function() {
                triggerLaunch();
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
        });

        describe('modes', function() {
            describe('normal', function() {
                it('latches current note', function() {
                    triggerLaunch();
                    tapNote(1);
                    expect(captureNoteOnCollision()).toBe(60);
                });
                
                it('clears previous note on re-initialised', function() {
                    triggerLaunch();
                    tapNote(1);
                    expect(captureNoteOnCollision()).toBe(60);

                    model = createModel();
                    triggerLaunch();
                    expect(captureNoteOnCollision()).toBeNull();
                });
            });
            
            describe('earth', function() {
                it('does not latch current note', function() {
                    triggerLaunch();
                    triggerAction('EARTH');
                    tapNote(1);
                    expect(captureNoteOnCollision()).toBeNull();
                });
                
                it('moves slower than a standard ball', function() {
                    triggerLaunch();
                    var initialSpeed = measureSpeed();
                    triggerAction('EARTH');
                    var currentSpeed = measureSpeed();

                    expect(currentSpeed).toBeLessThan(initialSpeed);
                });
                
                it('sticks to the paddle when caught', function() {
                    triggerLaunch();
                    triggerAction('EARTH');
                    stubNormal = [0, -1];
                    runToCollision();
                    runToCollision();
                    
                    expect(model.y).toEqual(paddle.top - d.BALL.RADIUS);
                    expect(model.released).toBe(false);
                });
                
                it('moves directly upwards when re-released', function() {
                    triggerLaunch();
                    triggerAction('EARTH');

                    var collided = false;
                    var point = physics.createPoint('BLOCK',
                        model.x - d.BALL.RADIUS / 2, model.y - d.HEIGHT / 5,
                        function() { collided = true; return true; }
                    );
                    
                    objects.push(point);
                    
                    while(model.released) {
                        model.update(100);
                    }
                    
                    objects.pop();

                    triggerLaunch();
                    expect(model.released).toBe(true);
                    expect(measureVelocity()[0]).toBe(0);
                });
            });
            
            describe('air', function() {
                it('does not pass note to collision function', function() {
                    triggerLaunch();
                    triggerAction('AIR');
                    var actualNote = null;
                    holdNote(1);

                    var newPlane = physics.createPlane('BLOCK', [0, 1], model.y - d.WIDTH / 4, function(x, y, t, note) {
                        actualNote = note;
                        return [0, 1];
                    });
                    objects.push(newPlane);
                    runToCollision();

                    expect(actualNote).toBeFalsy();
                });

                it('does not bounce off blocks', function() {
                    triggerLaunch();
                    triggerAction('AIR');

                    var newPlane = physics.createPlane('BLOCK', [0, 1], model.y - d.WIDTH / 4, function() {
                        return [0, 1];
                    });
                    objects.push(newPlane);
                    runToCollision();

                    var effectivePlaneY = newPlane.position()[1] + d.BALL.RADIUS;
                    expect(model.y).toBeLessThan(effectivePlaneY);
                });

                it('does not play note on collision', function() {
                    triggerLaunch();
                    triggerAction('AIR');
                    holdNote(1);
                    runToCollision();

                    expect(bounceNoteSpy).toBeFalsy();
                });

                it('moves faster than a standard ball', function() {
                    triggerLaunch();
                    var initialSpeed = measureSpeed();
                    triggerAction('FIRE');
                    var currentSpeed = measureSpeed();

                    expect(currentSpeed).toBeGreaterThan(initialSpeed);
                });
            });
            
            describe('fire', function() {
                it('passes wildcard note to collision function', function() {
                    triggerLaunch();
                    triggerAction('FIRE');
                    var actualNote = null;

                    var newPlane = physics.createPlane('BLOCK', [0, 1], model.y - d.WIDTH / 4, function(x, y, t, note) {
                        actualNote = note;
                        return [0, 1];
                    });
                    objects.push(newPlane);

                    runToCollision();

                    expect(actualNote).toBe(true);
                });
                
                it('moves faster than a standard ball', function() {
                    triggerLaunch();
                    var initialSpeed = measureSpeed();
                    triggerAction('FIRE');
                    var currentSpeed = measureSpeed();
                    
                    expect(currentSpeed).toBeGreaterThan(initialSpeed);
                });

                it('does not play note on collision', function() {
                    triggerLaunch();
                    triggerAction('FIRE');
                    holdNote(1);
                    runToCollision();
                    expect(bounceNoteSpy).toBeFalsy();
                });
            });
        });

        function triggerLaunch() {
            triggerAction('LAUNCH');
        }

        function tapNote(note) {
            stubNote = note;
            model.update(100);
            stubNote = null;
        }

        function holdNote(note) {
            stubNote = note;
        }

        function triggerAction(action) {
            model.update(100, action);
        }

        function measureVelocity() {
            var start = [model.x, model.y];
            model.update(100);
            return [model.x - start[0], model.y - start[1]];
        }

        function measureSpeed() {
            return maths.magnitude(measureVelocity());
        }

        function runToCollision() {
            var initialV = measureVelocity();

            while (true) {
                var currentV = measureVelocity();
                if (Math.abs(currentV[0] - initialV[0]) > 0.001 || Math.abs(currentV[1] - initialV[1]) > 0.001) {
                    return;
                }
            }
        }
        
        function captureNoteOnCollision() {
            bounceNoteSpy = null;
            runToCollision();
            return bounceNoteSpy;
        }
    });
});