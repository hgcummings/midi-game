define(['models/fixtures', 'models/blocks', 'models/paddle', 'models/ball', 'models/wave'],
    function(fixtures, blocks, paddle, ball, wave) {
    var allElements = ['EARTH', 'AIR', 'FIRE', 'WATER'];
    return {
        init: function(level, input, output) {
            var self = {};
            var prevTime = 0;

            self.input = input;
            self.remainingLives = 3;
            self.remainingElements = allElements.concat();

            self.fixtures = fixtures.init();
            self.blocks = blocks.init(level, output);
            self.paddle = paddle.init();
            
            var collisionObjects = self.fixtures.getCollisionObjects()
                .concat(self.blocks.getCollisionObjects(), self.paddle.getCollisionObjects());
            var createBall = function() {
                return ball.init(self.paddle, collisionObjects, input, output);
            };
            var getActive = function() {
                return self.ball || self.wave;
            };

            self.ball = createBall();
            self.update = function(gameTime) {
                var delta = gameTime - prevTime;
                var action = input.getAction();
                var elementIndex = self.remainingElements.indexOf(action);
                if (elementIndex === -1) {
                    if (allElements.indexOf(action) !== -1) {
                        action = null;
                    }
                } else {
                    self.remainingLives++;
                    self.remainingElements.splice(elementIndex, 1);
                }
                self.paddle.update(delta, input.getDirection());
                
                if (action === 'WATER') {
                    self.ball = null;
                    self.wave = wave.init(self.paddle, self.blocks, output);
                }
                
                if (self.ball !== null) {
                    self.ball.update(delta, action, gameTime);
                } else if (self.wave !== null) {
                    self.wave.update(delta);
                }
                
                if (!getActive().alive) {
                    --self.remainingLives;
                    self.wave = null;
                    self.ball = createBall();
                }
                
                prevTime = gameTime;
            };

            return self;
        }
    };
});
