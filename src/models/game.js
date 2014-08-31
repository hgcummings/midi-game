define(['models/level', 'models/paddle', 'data/constants'], function(loader, paddle, constants) {
    return {
        init: function(level, input) {
            var self = {};
            var prevTime = 0;

            self.update = function(gameTime) {
                var delta = gameTime - prevTime;
                self.paddle.update(delta, input.getDirection());
                prevTime = gameTime;
            };
            self.blocks = loader.load(level);
            self.paddle = paddle.init();

            return self;
        }
    };
});
