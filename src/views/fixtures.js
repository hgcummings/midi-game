define(['data/colours', 'data/dimensions', 'views/util'], function(c, d, util) {
    return {
        init: function(context, model) {
            var gap = d.CORNER - d.BORDER;
            var inner = d.BORDER - gap;
            var totalSpareLives = model.remainingLives;

            var elements = ['AIR', 'FIRE', 'EARTH', 'WATER'];
            var gradients = [];

            for (var i = 0; i < 2; ++i) {
                for (var j = 0; j < 2; ++j) {
                    var x = i * (d.WIDTH - d.CORNER) + d.CORNER / 2;
                    var y = j * (d.HEIGHT - d.CORNER) + d.CORNER / 2;
                    
                    var gradient = context.createRadialGradient(x, y, 0, x, y, d.CORNER / 2);
                    for (var k = 0; k < 2; ++k) {
                        gradient.addColorStop(k, c.ELEMENTS[elements[i + 2 * j]][k]);
                    }
                    gradients[i + 2 * j] = gradient;
                }
            }
            
            return {
                drawBorder: function(model) {
                    context.fillStyle = c.FIXTURES.BORDER;
                    context.fillRect(0, gap, d.WIDTH, inner);
                    context.fillRect(gap, 0, inner, d.HEIGHT);
                    context.fillRect(d.WIDTH - d.CORNER + gap, 0, inner, d.HEIGHT);
                    
                    for (var life = 0; life <= totalSpareLives; ++life) {
                        var x = (life - totalSpareLives / 2) * d.BORDER + d.WIDTH / 2;
                        var y = (d.BORDER + gap) / 2;
                        util.drawCircle(context, c.FIXTURES.SLOT, x, y, d.BALL.RADIUS + 2);
                        if (model.remainingLives > life) {
                            util.drawCircle(context, c.BALL, x, y, d.BALL.RADIUS);
                        }
                    }
                    
                    context.fillStyle = c.FIXTURES.CORNER;
                    context.strokeStyle = c.FIXTURES.SLOT;
                    for (var i = 0; i < 2; ++i) {
                        for (var j = 0; j < 2; ++j) {
                            context.fillRect(
                                i * (d.WIDTH - d.CORNER),
                                j * (d.HEIGHT - d.CORNER),
                                d.CORNER,
                                d.CORNER
                            );
                            context.save();
                            context.lineWidth = 4;
                            if (model.remainingElements.indexOf(elements[i + 2 * j]) !== -1) {
                                context.fillStyle = gradients[i + 2 * j];
                            } else {
                                context.fillStyle = c.FIXTURES.SLOT;
                            }
                            util.drawRoundedRect(context,
                                i * (d.WIDTH - d.CORNER) + d.CORNER / 6,
                                j * (d.HEIGHT - d.CORNER) + d.CORNER / 6,
                                2 * d.CORNER / 3,
                                2 * d.CORNER / 3,
                                d.CORNER / 12);
                            context.stroke();
                            context.fill();
                            context.restore();
                        }
                    }
                }
            };
        }
    };
});
