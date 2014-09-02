define(['data/constants'], function(c) {
    return {
        init: function(context) {
            var preRenderCanvas = document.createElement('canvas');
            preRenderCanvas.width = c.BLOCK.SIZE.X;
            preRenderCanvas.height = c.BLOCK.SIZE.Y;

            var preContext = preRenderCanvas.getContext('2d');
            preContext.fillStyle = '#CCCCCC';
            preContext.beginPath();

            preContext.arc(c.BLOCK.RADIUS, c.BLOCK.RADIUS, c.BLOCK.RADIUS, Math.PI, Math.PI * 3 / 2, false);
            preContext.lineTo(c.BLOCK.SIZE.X - c.BLOCK.RADIUS, 0);
            preContext.arc(c.BLOCK.SIZE.X - c.BLOCK.RADIUS, c.BLOCK.RADIUS, c.BLOCK.RADIUS, Math.PI * 3 / 2, 0, false);
            preContext.lineTo(c.BLOCK.SIZE.X, c.BLOCK.SIZE.Y - c.BLOCK.RADIUS);
            preContext.arc(c.BLOCK.SIZE.X - c.BLOCK.RADIUS, c.BLOCK.SIZE.Y - c.BLOCK.RADIUS, c.BLOCK.RADIUS, 0, Math.PI / 2, false);
            preContext.lineTo(c.BLOCK.RADIUS, c.BLOCK.SIZE.Y);
            preContext.arc(c.BLOCK.RADIUS, c.BLOCK.SIZE.Y - c.BLOCK.RADIUS, c.BLOCK.RADIUS, Math.PI / 2, Math.PI, false);
            preContext.lineTo(0, c.BLOCK.RADIUS);

            preContext.fill();

            var left = c.BLOCK.MARGIN.X + (c.BLOCK.SPACING.X - c.BLOCK.SIZE.X) / 2;
            var top = c.BLOCK.MARGIN.Y;

            return {
                drawBlock: function(block) {
                    context.drawImage(preRenderCanvas,
                        left + block.col * c.BLOCK.SPACING.X,
                        top + block.row * c.BLOCK.SPACING.Y);
                }
            };
        }
    };
});
