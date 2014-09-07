define(['data/colours', 'data/dimensions', 'views/util'], function(c, d, util) {
    return {
        init: function(context, model) {
            var gap = d.CORNER - d.BORDER;
            var inner = d.BORDER - gap;
            var totalSpareLives = model.spareLives;
            return {
                drawBorder: function(model) {
                    context.fillStyle = c.FIXTURES.BORDER;
                    context.fillRect(0, gap, d.WIDTH, inner);
                    context.fillRect(gap, 0, inner, d.HEIGHT);
                    context.fillRect(d.WIDTH - d.CORNER + gap, 0, inner, d.HEIGHT);
                    
                    
                    for (var life = 0; life < totalSpareLives; ++life) {
                        var x = (life - (totalSpareLives - 1) / 2) * d.BORDER + d.WIDTH / 2;
                        var y = d.BORDER / 2;
                        util.drawCircle(context, c.FIXTURES.SLOT, x, y, d.BALL.RADIUS + 2);
                        if (model.spareLives > life) {
                            util.drawCircle(context, c.BALL, x, y, d.BALL.RADIUS);
                        }
                    }

                    context.fillStyle = c.FIXTURES.CORNER;
                    for (var i = 0; i < 2; ++i) {
                        for (var j = 0; j < 2; ++j) {
                            context.fillRect(
                                i * (d.WIDTH - d.CORNER),
                                j * (d.HEIGHT - d.CORNER),
                                d.CORNER,
                                d.CORNER
                            );
                        }
                    }
                }
            };
        }
    };
});
