define(['graphics/blocks'], function(blocks) {
    return {
        init: function(parent, model) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', '1024');
            canvas.setAttribute('height', '768');
            canvas.style.backgroundColor = '#000000';
            parent.appendChild(canvas);
            
            var startTime = new Date().getTime();
            
            var animate = function() {
                var gameTime = new Date().getTime() - startTime;
                model.update(gameTime);
                
                window.requestAnimationFrame(animate);
            };
            
            window.requestAnimationFrame(animate);
        }
    }
});