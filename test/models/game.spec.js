define(['models/game', 'data/dimensions'], function(game, d) {
    'use strict';
    describe('game', function() {
        var level = { name: 'Test Level', notes: [[1, 1]]};
        var model;
        var stubInput = {
            getDirection: function() { return stubInput.direction; },
            getAction: function() { return stubInput.action; },
            getNote: function() { return null; }
        };

        beforeEach(function() {
            model = game.init(level, stubInput, { playBounce: function() {} });
            stubInput.action = null;
            stubInput.direction = 0;
        });

        describe('init', function() {
            it('creates ball above paddle', function() {
                expect(model.paddle.x).toBeDefined();
                expect(model.ball.x).toBeDefined();
                expect(model.ball.y).toBeDefined();
                expect(model.ball.x).toBe(model.paddle.x);
                expect(model.ball.y).toBeLessThan(model.paddle.top);
            });

            it('links the ball and paddle to user input', function() {
                var initialPosition = model.paddle.x;

                stubInput.direction = 1;
                model.update(500);

                var currentPosition = model.paddle.x;
                expect(currentPosition).toBeGreaterThan(initialPosition);
                expect(model.ball.x).toBe(currentPosition);
            });
            
            it('starts with three spare lives', function() {
                expect(model.remainingLives).toBe(3);
            });
            
            it('starts with all available elements', function() {
                expect(model.remainingElements).toContain('EARTH');
                expect(model.remainingElements).toContain('AIR');
                expect(model.remainingElements).toContain('FIRE');
                expect(model.remainingElements).toContain('WATER');
            });
            
            it('exposes the level name', function() {
                expect(model.levelName).toBe(level.name);
            });
        });

        describe('update', function() {
            it('launches the ball in response to user input', function() {
                var initialPosition = model.ball.y;

                stubInput.action = 'LAUNCH';
                model.update(500);
                stubInput.action = null;
                model.update(1000);

                expect(model.ball.y).toBeLessThan(initialPosition);
            });

            it('uses up a life and creates a new ball when the ball is lost', function() {
                stubInput.action = 'LAUNCH';
                model.update(500);
                stubInput.direction = 1;

                var firstBall = model.ball;
                
                var gameTime = 500;
                while(model.ball.y < model.paddle.top - d.BALL.RADIUS) {
                    model.update(gameTime += 100);
                }
                
                for (var i = 0; i < 10; ++i) {
                    model.update(gameTime += 500);
                }

                expect(model.remainingLives).toBe(2);
                expect(model.ball).not.toBe(firstBall);
                expect(model.ball.x).toBe(model.paddle.x);
                expect(model.ball.y).toBeLessThan(model.paddle.top);
            });
            
            it('removes element from remaining elements when used', function() {
                stubInput.action = 'AIR';
                model.update(500);
                expect(model.remainingElements).not.toContain('AIR');
            });

            it('places current ball back in spare slot when using an element', function() {
                var initialLives = model.remainingLives;
                stubInput.action = 'AIR';
                model.update(500);
                expect(model.remainingLives).toBe(initialLives + 1);
            });

            it('does not allow the same element to be used twice', function() {
                stubInput.action = 'AIR';
                model.update(500);
                stubInput.action = 'FIRE';
                model.update(1000);
                var fireMode = model.ball.mode;
                stubInput.action = 'AIR';
                model.update(1500);
                expect(model.ball.mode).toBe(fireMode);
            });
            
            it('deactivates the ball when wave is selected', function() {
                stubInput.action = 'WATER';
                model.update(500);
                
                expect(model.ball).toBeNull();
                expect(model.wave).toBeTruthy();
            });

            it('deactivates the wave when another element is selected', function() {
                stubInput.action = 'WATER';
                model.update(500);

                stubInput.action = 'FIRE';
                model.update(500);

                expect(model.ball).toBeTruthy();
                expect(model.wave).toBeNull();
            });

            it('restores next ball after water expires', function() {
                stubInput.action = 'WATER';
                model.update(500);
                
                var gameTime = 500;
                for (var i = 0; i < 20; ++i) {
                    model.update(gameTime += 1000);
                }

                expect(model.wave).toBeNull();
                expect(model.ball).toBeTruthy();
            });
            
            it('returns success when level cleared', function() {
                for (var row = 0; row < model.blocks.all.length; ++row) {
                    for (var col = 0; col < model.blocks.all[row].length; ++col) {
                        model.blocks.all[row][col].hit = 1;
                    }
                }
                
                var result = model.update(500);
                expect(result).toBe('CLEARED');
            });

            it('returns failure when no more spare lives', function() {
                var gameTime = 100;
                
                while(model.remainingLives >= 0) {
                    stubInput.action = 'LAUNCH';
                    model.update(gameTime);
                    stubInput.action = null;
                    stubInput.direction = model.remainingLives % 2;
                    while (model.ball.y <= model.paddle.top - d.BALL.RADIUS) {
                        model.update(gameTime += 100);
                    }
                    model.update(gameTime += 500);
                }

                var result = model.update(gameTime += 500);
                expect(result).toBe('FAILED');
            });
            
            it('returns paused when paused', function() {
                stubInput.action = 'PAUSE';
                var result = model.update(100);
                expect(result).toBe('PAUSED');
            });
            
            it('updates the gameTime', function() {
                expect(model.gameTime).toBe(0);
                model.update(500);
                expect(model.gameTime).toBe(500);
                model.update(1000);
                expect(model.gameTime).toBe(1000);
            });
        });
    });
});
