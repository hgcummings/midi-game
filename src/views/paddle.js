define(['data/colours', 'data/dimensions'], function(c, d) {
    'use strict';
    return {
        init: function(context) {
            return {
                drawPaddle: function(paddle) {
                    context.fillStyle = c.PADDLE;

                    context.fillRect(
                        paddle.x - d.PADDLE.SIZE.X / 2,
                        paddle.top,
                        d.PADDLE.SIZE.X,
                        d.PADDLE.SIZE.Y);
                }
            };
        }
    };
});
