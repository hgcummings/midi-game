define(['data/colours', 'data/dimensions', 'views/util'], function(c, d, util) {
    return {
        init: function(context) {
            return {
                drawBall: function(ball) {
                    util.drawCircle(context, c.BALL, Math.round(ball.x), Math.round(ball.y), d.BALL.RADIUS);
                }
            };
        }
    };
});
