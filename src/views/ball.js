define(['data/colours', 'data/dimensions', 'views/util'], function(c, d, util) {
    return {
        init: function(context) {
            return {
                drawBall: function(ball, input) {
                    var colour;

                    if (typeof ball.mode.getNote(input) === 'number') {
                        colour = c.NOTES[ball.mode.getNote(input)];
                    } else if (ball.mode.element) {
                        colour = context.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, d.BALL.RADIUS);
                        for (var k = 0; k < 2; ++k) {
                            colour.addColorStop(k, c.ELEMENTS[ball.mode.element][k]);
                        }
                    } else {
                        colour = c.BALL;
                    }
                    
                    util.drawCircle(context, colour, Math.round(ball.x), Math.round(ball.y), d.BALL.RADIUS);
                },
                drawWave: function(wave) {
                    context.save();
                    context.globalAlpha = 0.65;
                    context.fillStyle = c.ELEMENTS.WATER[0];
                    util.drawRoundedRect(context,
                        wave.x - d.BALL.RADIUS, wave.top, d.BALL.RADIUS * 2, wave.bottom - wave.top, d.BALL.RADIUS);
                    context.fill();
                    context.restore();
                }
            };
        }
    };
});
