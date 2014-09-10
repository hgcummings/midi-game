define(['data/colours', 'data/dimensions', 'views/util'], function(c, d, util) {
    return {
        init: function(context, model) {
            var preRenderBlock = function(colour) {
                var preRenderCanvas = document.createElement('canvas');
                preRenderCanvas.width = model.blockWidth;
                preRenderCanvas.height = model.blockHeight;

                var preContext = preRenderCanvas.getContext('2d');
                preContext.fillStyle = colour;
                preContext.beginPath();

                util.drawRoundedRect(preContext, 0, 0, model.blockWidth, model.blockHeight, d.BLOCK.RADIUS);

                preContext.fill();
                return preRenderCanvas;
            };
            
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
