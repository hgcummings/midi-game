define(['data/colours', 'data/dimensions', 'views/fixtures', 'views/blocks', 'views/paddle', 'views/ball', 'views/help'],
function(c, d, fixturesView, blocksView, paddleView, ballView, helpView) {
    var headerText = {
        CLEARED: 'Level cleared!',
        FAILED: 'Game over!',
        PAUSED: 'Paused'
    };
    
    return {
        init: function(parent, model) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', d.WIDTH);
            canvas.setAttribute('height', d.HEIGHT);
            canvas.style.backgroundColor = c.BACKGROUND;
            parent.appendChild(canvas);
            
            var pauseScreen = document.createElement('div');
            pauseScreen.style.display = 'none';
            pauseScreen.style.width = d.WIDTH + 'px';
            pauseScreen.style.height = d.HEIGHT + 'px';
            pauseScreen.classList.add('pause');
            
            var pauseHeader = document.createElement('h2');
            var pauseHeaderText = document.createTextNode('');
            var pauseBody = document.createElement('p');
            var pauseBodyText = document.createTextNode('Press space to continue');
            
            pauseHeader.appendChild(pauseHeaderText);
            pauseBody.appendChild(pauseBodyText);
            pauseScreen.appendChild(pauseHeader);
            pauseScreen.appendChild(pauseBody);
            pauseScreen.appendChild(helpView.init());
            parent.appendChild(pauseScreen);

            var context = canvas.getContext('2d');
            var startTime = new Date().getTime();
            var pauseTime = 0;
            var prevTime = startTime;
            var fixtures = fixturesView.init(context, model);
            var blocks = blocksView.init(context, model.blocks);
            var paddle = paddleView.init(context);
            var ball = ballView.init(context);
            
            var paused = false;
            
            var update = function(currentTime) {
                if (currentTime - prevTime > 100) {
                    pauseTime += currentTime - prevTime;
                    return;
                }
                var gameTime = currentTime - startTime - pauseTime;
                var status = model.update(gameTime);
                
                if (status) {
                    pauseScreen.style.display = 'block';
                    paused = status;
                    if (headerText.hasOwnProperty(status)) {
                        pauseHeaderText.replaceWholeText(headerText[status]);
                    }
                }

                var drawBlock = function(block) {
                    blocks.drawBlock(block, gameTime);
                };

                context.clearRect(0, 0, d.WIDTH, d.HEIGHT);

                fixtures.drawBorder(model, gameTime);
                model.blocks.all.forEach(function(row) {
                    row.forEach(drawBlock);
                });
                paddle.drawPaddle(model.paddle);
                if (model.ball) {
                    ball.drawBall(model.ball, model.input);
                }
                if (model.wave) {
                    ball.drawWave(model.wave);
                }
                helpView.drawHint(context, model);
            };
            
            var animate = function() {
                var currentTime = new Date().getTime();
                if (paused && model.input.getAction() === 'LAUNCH') {
                    if (paused === 'PAUSED') {
                        paused = false;
                        pauseScreen.style.display = 'none';
                        model.input.clearAction();
                    } else {
                        window.location.reload();
                        return;
                    }
                } else if (!paused) {
                    update(currentTime);
                    prevTime = currentTime;                    
                }
                window.requestAnimationFrame(animate);
            };

            window.requestAnimationFrame(animate);
        }
    };
});
