define(['data/constants'], function(c) {
    return {
        init: function(context) {
            return {
                drawBall: function(ball) {
                    context.beginPath();
                    context.fillStyle = '#EEEEEE';
                    context.arc(ball.x, ball.y, c.BALL.RADIUS, 2 * Math.PI, false);
                    context.fill();
                }
            };
        }
    };
});
