define(['data/dimensions', 'models/physics'], function(d, physics) {
    'use strict';
    return {
        init: function() {
            var self = {};
            var speed = d.WIDTH / 2500;
            var leftBound = d.PADDLE.MARGIN.X + d.PADDLE.SIZE.X / 2;
            var rightBound = d.WIDTH - d.PADDLE.MARGIN.X - d.PADDLE.SIZE.X / 2;
            var halfWidth = d.PADDLE.SIZE.X / 2;
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
                return [physics.createPlane('PADDLE', [0, -1], self.top, self.positionNormal)];
            };

            self.positionNormal = function(x) {
                var offset = x - self.x, overlap, angle;
                if (Math.abs(offset) < halfWidth) {
                    overlap = offset / halfWidth;
                    angle = angleAtEdge * Math.PI / 4 * overlap * overlap * overlap;
                    return [Math.sin(angle), -Math.cos(angle)];
                } else if (Math.abs(offset) < halfWidth + d.BALL.RADIUS) {
                    overlap = Math.abs(offset) - halfWidth; 
                    angle = (angleAtEdge + (glancingAngleAtEdge - angleAtEdge) *
                        (overlap / d.BALL.RADIUS)) * offset / Math.abs(offset);
                    return [Math.sin(angle), -Math.cos(angle)];
                } else {
                    return null;
                }
            };

            self.x = d.WIDTH / 2;
            self.top = d.HEIGHT - d.PADDLE.MARGIN.Y - d.PADDLE.SIZE.Y;

            return self;
        }
    };
});
