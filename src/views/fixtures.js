define(['data/constants', 'views/util'], function(c, util) {
    return {
        init: function(context, model) {
            var gap = c.CORNER - c.BORDER;
            var inner = c.BORDER - gap;
            var totalSpareLives = model.spareLives;
            return {
                drawBorder: function(model) {
                    context.fillStyle = '#666666';
                    context.fillRect(0, gap, c.WIDTH, inner);
                    context.fillRect(gap, 0, inner, c.HEIGHT);
                    context.fillRect(c.WIDTH - c.CORNER + gap, 0, inner, c.HEIGHT);
                    
                    
                    for (var life = 0; life < totalSpareLives; ++life) {
                        var x = (life - (totalSpareLives - 1) / 2) * c.BORDER + c.WIDTH / 2;
                        var y = c.BORDER / 2;
                        util.drawCircle(context, '#000', x, y, c.BALL.RADIUS + 2);
                        if (model.spareLives > life) {
                            util.drawCircle(context, '#eee', x, y, c.BALL.RADIUS);
                        }
                    }

                    context.fillStyle = '#EEEEEE';
                    for (var i = 0; i < 2; ++i) {
                        for (var j = 0; j < 2; ++j) {
                            context.fillRect(
                                i * (c.WIDTH - c.CORNER),
                                j * (c.HEIGHT - c.CORNER),
                                c.CORNER,
                                c.CORNER
                            );
                        }
                    }
                }
            };
        }
    };
});
