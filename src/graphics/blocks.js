define(['data/constants'], function(c) {
    return {
        init: function(canvas) {
            var context = canvas.getContext('2d');
            return {
                drawBlock: function(block, x, y) {
                    if (block.hit) {
                        context.fillStyle = '#FFFFFF';
                    } else {
                        context.fillStyle = '#CCCCCC';
                    }

                    context.fillRect(
                        c.BLOCK.MARGIN.X + x * c.BLOCK.SPACING.X,
                        c.BLOCK.MARGIN.Y + y * c.BLOCK.SPACING.Y,
                        c.BLOCK.SIZE.X,
                        c.BLOCK.SIZE.Y);
                }
            };
        }
    };
});
