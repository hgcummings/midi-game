define(['data/constants'], function(c) {
    return {
        init: function(context) {
            return {
                drawBall: function(ball) {
                    context.beginPath();
                    context.fillStyle = '#EEEEEE';
                    context.arc(Math.round(ball.x), Math.round(ball.y), c.BALL.RADIUS, 2 * Math.PI, false);
                    context.fill();
                    context.closePath();
                }
            };
        }
    };
});
