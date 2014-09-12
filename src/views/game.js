define(['data/colours', 'data/dimensions', 'views/fixtures', 'views/blocks', 'views/paddle', 'views/ball'],
function(c, d, fixtures, blocks, paddle, ball) {
    var headerText = {
        CLEARED: 'Level cleared!',
        FAILED: 'Game over!',
        PAUSED: 'Paused'
    };

    var bodyText = {
        CLEARED: 'Press F5 to play again',
        FAILED: 'Press F5 to play again',
        PAUSED: 'Press space to resume'
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
            var pauseBodyText = document.createTextNode('');
            
            pauseHeader.appendChild(pauseHeaderText);
            pauseBody.appendChild(pauseBodyText);
            pauseScreen.appendChild(pauseHeader);
            pauseScreen.appendChild(pauseBody);
            parent.appendChild(pauseScreen);

            var context = canvas.getContext('2d');
            var startTime = new Date().getTime();
            var pauseTime = 0;
            var prevTime = startTime;
            fixtures = fixtures.init(context, model);
            blocks = blocks.init(context, model.blocks);
            paddle = paddle.init(context);
            ball = ball.init(context);
            
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

                    if (bodyText.hasOwnProperty(status)) {
                        pauseBodyText.replaceWholeText(bodyText[status]);
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
            };
            
            var animate = function() {
                var currentTime = new Date().getTime();
                if (paused) {
                    if (paused === 'PAUSED' && model.input.getAction() === 'LAUNCH') {
                        paused = false;
                        pauseScreen.style.display = 'none';
                    }
                } else {
                    update(currentTime);
                    prevTime = currentTime;                    
                }
                window.requestAnimationFrame(animate);
            };

            window.requestAnimationFrame(animate);
        }
    };
});
