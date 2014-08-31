define(['data/constants'], function(c) {
    return {
        init: function(canvas) {
            var context = canvas.getContext('2d');
            return {
                drawPaddle: function(paddle) {
                    context.fillStyle = '#DDDDDD';

                    context.fillRect(
                        paddle.x - c.PADDLE.SIZE.X / 2,
                        c.HEIGHT - c.PADDLE.MARGIN.Y - c.PADDLE.SIZE.Y,
                        c.PADDLE.SIZE.X,
                        c.PADDLE.SIZE.Y);
                }
            };
        }
    };
});
