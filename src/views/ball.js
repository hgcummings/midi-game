define(['data/constants', 'views/util'], function(c, util) {
    return {
        init: function(context) {
            return {
                drawBall: function(ball) {
                    util.drawCircle(context, '#EEEEEE', Math.round(ball.x), Math.round(ball.y), c.BALL.RADIUS);
                }
            };
        }
    };
});
