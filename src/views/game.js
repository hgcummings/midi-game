define(['data/constants', 'graphics/fixtures', 'graphics/blocks', 'graphics/paddle', 'graphics/ball'],
function(constants, fixtures, blocks, paddle, ball) {
    return {
        init: function(parent, model) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', constants.WIDTH);
            canvas.setAttribute('height', constants.HEIGHT);
            canvas.style.backgroundColor = '#000000';
            parent.appendChild(canvas);

            var context = canvas.getContext('2d');
            var startTime = new Date().getTime();
            fixtures = fixtures.init(context);
            blocks = blocks.init(context);
            paddle = paddle.init(context);
            ball = ball.init(context);

            var animate = function() {
                var gameTime = new Date().getTime() - startTime;
                model.update(gameTime);

                context.clearRect(0, 0, constants.WIDTH, constants.HEIGHT);

                fixtures.drawBorder();
                for (var y = 0; y < model.blocks.length; ++y) {
                    var row = model.blocks[y];
                    for (var x = 0; x < row.length; ++x) {
                        blocks.drawBlock(row[x], x, y);
                    }
                }
                paddle.drawPaddle(model.paddle);
                ball.drawBall(model.ball);

                window.requestAnimationFrame(animate);
            };

            window.requestAnimationFrame(animate);
        }
    }
});
