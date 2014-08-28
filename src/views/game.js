define(['graphics/blocks'], function(blocks) {
    return {
        init: function(parent, model) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', '1024');
            canvas.setAttribute('height', '768');
            canvas.style.backgroundColor = '#000000';
            parent.appendChild(canvas);

            var context = canvas.getContext('2d');            
            var startTime = new Date().getTime();
            blocks = blocks.init(canvas);
            
            var animate = function() {
                var gameTime = new Date().getTime() - startTime;
                model.update(gameTime);
                
                context.clearRect(0, 0, 1024, 768);
                
                for (var y = 0; y < model.blocks.length; ++y) {
                    var row = model.blocks[y];
                    for (var x = 0; x < row.length; ++x) {
                        blocks.drawBlock(row[x], x, y);   
                    }
                }
                
                window.requestAnimationFrame(animate);
            };
            
            window.requestAnimationFrame(animate);
        }
    }
});