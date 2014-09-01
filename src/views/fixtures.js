define(['data/constants'], function(c) {
    return {
        init: function(context) {
            var gap = c.CORNER - c.BORDER;
            var inner = c.BORDER - gap;
            return {
                drawBorder: function() {
                    context.fillStyle = '#666666';
                    context.fillRect(0, gap, c.WIDTH, inner);
                    context.fillRect(gap, 0, inner, c.HEIGHT);
                    context.fillRect(c.WIDTH - c.CORNER + gap, 0, inner, c.HEIGHT);

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
