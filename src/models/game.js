define(['data/progress', 'models/fixtures', 'models/blocks', 'models/paddle', 'models/ball', 'models/wave'],
    function(progress, fixtures, blocks, paddle, ball, wave) {
    var allElements = ['EARTH', 'AIR', 'FIRE', 'WATER'];
    function cleared(blocks) {
        for (var row = 0; row < blocks.all.length; ++row) {
            for (var col = 0; col < blocks.all[row].length; ++col) {
                if (!blocks.all[row][col].hit) {
                    return false;
                }
            }
        }
        return true;
    }

    return {
        init: function(level, input, output) {
            var self = {};
            self.gameTime = 0;

            self.input = input;
            self.remainingLives = 3;
            self.remainingElements = allElements.concat();

            self.fixtures = fixtures.init();
            self.blocks = blocks.init(level.notes, output);
            self.paddle = paddle.init();
            
            self.levelName = level.name;

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
                var delta = gameTime - self.gameTime;
                var action = input.getAction();
                
                if (action === 'PAUSE') {
                    return 'PAUSED';
                }

                var elementIndex = self.remainingElements.indexOf(action);
                if (elementIndex === -1) {
                    if (allElements.indexOf(action) !== -1) {
                        action = null;
                    }
                } else {
                    self.remainingLives++;
                    self.remainingElements.splice(elementIndex, 1);
                    if (self.wave) {
                        self.wave = null;
                        self.ball = createBall();
                    }
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

                    if (self.remainingLives < 0) {
                        return 'FAILED';
                    }

                    self.wave = null;
                    self.ball = createBall();
                }

                self.gameTime = gameTime;

                if (cleared(self.blocks)) {
                    progress.saveTime(level.id, Math.round(gameTime / 1000));
                    return 'CLEARED';
                }
            };

            return self;
        }
    };
});
