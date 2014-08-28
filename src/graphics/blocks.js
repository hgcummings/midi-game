define(function() {
    var BLOCK_SPACING_X = 78;
    var BLOCK_SPACING_Y = 78;
    
    var MARGIN_X = 44;
    var MARGIN_Y = 72;
    
    var BLOCK_WIDTH = 64;
    var BLOCK_HEIGHT = 40;
    
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
                        MARGIN_X + x * BLOCK_SPACING_X,
                        MARGIN_Y + y * BLOCK_SPACING_Y,
                        BLOCK_WIDTH,
                        BLOCK_HEIGHT);
                }
            };
        }
    }
});