define(['data/constants', 'models/physics'], function(constants, physics) {
    return {
        init: function() {
            var self = {};
            var speed = constants.WIDTH / 2500;
            var leftBound = constants.PADDLE.MARGIN.X + constants.PADDLE.SIZE.X / 2;
            var rightBound = constants.WIDTH - constants.PADDLE.MARGIN.X - constants.PADDLE.SIZE.X / 2;
            var halfWidth = constants.PADDLE.SIZE.X / 2;
            var angleAtEdge = 0.95 * Math.PI / 4;
            var glancingAngleAtEdge = 0.99 * Math.PI / 4;

            self.update = function(delta, direction) {
                self.x += direction * speed * delta;

                if (self.x < leftBound) {
                    self.x = leftBound;
                } else if (self.x > rightBound) {
                    self.x = rightBound;
                }
            };
            
            self.getCollisionObjects = function() {
                return [physics.createPlane([0, -1], self.top, self.positionNormal)];
            };

            self.positionNormal = function(x) {
                var offset = x - self.x;
                if (Math.abs(offset) < halfWidth) {
                    var overlap = offset / halfWidth;
                    var angle = angleAtEdge * Math.PI / 4 * overlap * overlap * overlap;
                    return [Math.sin(angle), -Math.cos(angle)];
                } else if (Math.abs(offset) < halfWidth + constants.BALL.RADIUS) {
                    var overlap = Math.abs(offset) - halfWidth; 
                    var angle = (angleAtEdge + (glancingAngleAtEdge - angleAtEdge) *
                        (overlap / constants.BALL.RADIUS)) * offset / Math.abs(offset);
                    return [Math.sin(angle), -Math.cos(angle)];
                } else {
                    return null;
                }
            };

            self.x = constants.WIDTH / 2;
            self.top = constants.HEIGHT - constants.PADDLE.MARGIN.Y - constants.PADDLE.SIZE.Y;

            return self;
        }
    }
});
