define(['data/colours', 'data/dimensions'], function(c, d) {
    function preRenderBlock(colour) {
        var preRenderCanvas = document.createElement('canvas');
        preRenderCanvas.width = d.BLOCK.SIZE.X;
        preRenderCanvas.height = d.BLOCK.SIZE.Y;

        var preContext = preRenderCanvas.getContext('2d');
        preContext.fillStyle = colour;
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
        return preRenderCanvas;
    }

    return {
        init: function(context) {
            var inactive = preRenderBlock(c.BLOCK);
            var active = {};
            var fade = 1000;
            for (var note in c.NOTES) {
                if (c.NOTES.hasOwnProperty(note)) {
                    active[note] = preRenderBlock(c.NOTES[note]);
                }
            }
            return {
                drawBlock: function(block, gameTime) {
                    if (block.hit) {
                        context.save();
                        context.globalAlpha = Math.max(125, fade + block.hit - gameTime) / fade;
                        context.drawImage(active[block.note], block.x, block.y);
                        context.restore();
                    } else {
                        context.drawImage(inactive, block.x, block.y);
                    }
                }
            };
        }
    };
});
