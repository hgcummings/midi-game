define(['data/colours', 'data/dimensions'], function(c, d) {
    return {
        init: function(context) {
            var preRenderCanvas = document.createElement('canvas');
            preRenderCanvas.width = d.BLOCK.SIZE.X;
            preRenderCanvas.height = d.BLOCK.SIZE.Y;

            var preContext = preRenderCanvas.getContext('2d');
            preContext.fillStyle = c.BLOCK;
            preContext.beginPath();

            preContext.arc(d.BLOCK.RADIUS, d.BLOCK.RADIUS, d.BLOCK.RADIUS, Math.PI, Math.PI * 3 / 2, false);
            preContext.lineTo(d.BLOCK.SIZE.X - d.BLOCK.RADIUS, 0);
            preContext.arc(d.BLOCK.SIZE.X - d.BLOCK.RADIUS, d.BLOCK.RADIUS, d.BLOCK.RADIUS, Math.PI * 3 / 2, 0, false);
            preContext.lineTo(d.BLOCK.SIZE.X, d.BLOCK.SIZE.Y - d.BLOCK.RADIUS);
            preContext.arc(d.BLOCK.SIZE.X - d.BLOCK.RADIUS, d.BLOCK.SIZE.Y - d.BLOCK.RADIUS, d.BLOCK.RADIUS, 0, Math.PI / 2, false);
            preContext.lineTo(d.BLOCK.RADIUS, d.BLOCK.SIZE.Y);
            preContext.arc(d.BLOCK.RADIUS, d.BLOCK.SIZE.Y - d.BLOCK.RADIUS, d.BLOCK.RADIUS, Math.PI / 2, Math.PI, false);
            preContext.lineTo(0, d.BLOCK.RADIUS);

            preContext.fill();

            return {
                drawBlock: function(block) {
                    if (block.hit) {
                        return;
                    }
                    
                    context.drawImage(preRenderCanvas, block.x, block.y);
                }
            };
        }
    };
});
