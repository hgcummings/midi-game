define(['data/constants'], function(c) {
    return {
        init: function(context) {
            var cornerSize = c.BORDER * 2;
            return {
                drawBorder: function() {
                    context.fillStyle = '#666666';
                    context.fillRect(0, 0, c.WIDTH, c.BORDER);
                    context.fillRect(0, 0, c.BORDER, c.HEIGHT);
                    context.fillRect(c.WIDTH-c.BORDER, 0, c.BORDER, c.HEIGHT);

                    context.fillStyle = '#EEEEEE';
                    for (var i = 0; i < 2; ++i) {
                        for (var j = 0; j < 2; ++j) {
                            context.fillRect(
                                i * (c.WIDTH - cornerSize),
                                j * (c.HEIGHT - cornerSize),
                                cornerSize,
                                cornerSize
                            )

                        }
                    }
                }
            }
        }
    }
});
