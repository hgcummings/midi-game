define(['data/dimensions'], function(d) {
    var growthRate = d.HEIGHT / 4800;
    return {        
        init: function(paddle, blocks, output) {
            var self = {};
            var growing = true;
            var activeIntersectingBlocks = [];
            self.alive = true;
            self.x = paddle.x;
            self.bottom = paddle.top;
            self.top = paddle.top;
            
            self.update = function(delta) {                
                self.x = paddle.x;
                
                if (growing) {
                    self.top -= growthRate * delta;

                    if (self.top < d.BORDER) {
                        self.top = d.BORDER;
                        growing = false;
                    }
                } else {
                    self.bottom -= growthRate * delta / 2;
                    if (self.bottom < self.top + 2 * d.BALL.RADIUS) {
                        self.bottom = self.top;
                        self.alive = false;
                    }
                }
                
                if (self.alive) {
                    var newIntersectingBlocks = blocks.getIntersection(self.x, self.top, self.bottom);
                    
                    activeIntersectingBlocks.concat().forEach(function(soundingBlock) {
                        var index = newIntersectingBlocks.indexOf(soundingBlock.block);
                        if (index === -1) {
                            soundingBlock.note.stop();
                            soundingBlock.toDelete = true;
                        } else {
                            newIntersectingBlocks.splice(index, 1);
                        }
                    });
                    
                    activeIntersectingBlocks = activeIntersectingBlocks.filter(function(soundingBlock) {
                        return !soundingBlock.toDelete;
                    });
                    
                    newIntersectingBlocks.forEach(function(block) {
                        if (!block.hit) {
                            activeIntersectingBlocks.push({ block: block, note: output.startNote(block.midiNote) });
                        }
                    });
                }
            };
            
            return self;
        }
    };
});