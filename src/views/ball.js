define(['data/colours', 'data/dimensions', 'views/util'], function(c, d, util) {
    return {
        init: function(context) {
            return {
                drawBall: function(ball, input) {
                    var colour;
                    if (input.getNote()) {
                        colour = c.NOTES[input.getNote()];
                    } else {
                        colour = c.BALL;
                    }
                    
                    util.drawCircle(context, colour, Math.round(ball.x), Math.round(ball.y), d.BALL.RADIUS);
                }
            };
        }
    };
});
