define(['models/game', 'data/constants'], function(game, constants) {
    describe('game', function() {
        var level = [[]];
        var model;
        var stubInput = {
            direction: 0,
            action: null,
            getDirection: function() { return stubInput.direction; },
            getAction: function() { return stubInput.action; }
        };

        beforeEach(function() {
            model = game.init(level, stubInput);
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
                expect(model.spareLives).toBe(3);
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
                
                var lastY = model.ball.y;
                
                while(model.ball.y < model.paddle.top - constants.BALL.RADIUS) {
                    model.update(100);
                    lastY = model.ball.y;
                }
                
                for (var i = 0; i < 10; ++i) {
                    model.update(100);
                }

                expect(model.spareLives).toBe(2);
                expect(model.ball).not.toBe(firstBall);
                expect(model.ball.x).toBe(model.paddle.x);
                expect(model.ball.y).toBeLessThan(model.paddle.top);
            });
        });
    });
});
