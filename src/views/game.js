define(['data/colours', 'data/dimensions', 'views/fixtures', 'views/blocks', 'views/paddle', 'views/ball'],
function(c, d, fixtures, blocks, paddle, ball) {
    return {
        init: function(parent, model) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', d.WIDTH);
            canvas.setAttribute('height', d.HEIGHT);
            canvas.style.backgroundColor = c.BACKGROUND;
            parent.appendChild(canvas);

            var context = canvas.getContext('2d');
            var startTime = new Date().getTime();
            fixtures = fixtures.init(context, model);
            blocks = blocks.init(context);
            paddle = paddle.init(context);
            ball = ball.init(context);

            var animate = function() {
                var gameTime = new Date().getTime() - startTime;
                model.update(gameTime);

                context.clearRect(0, 0, d.WIDTH, d.HEIGHT);

                fixtures.drawBorder(model);
                model.blocks.all.forEach(function(row) {
                    row.forEach(blocks.drawBlock);
                });
                paddle.drawPaddle(model.paddle);
                ball.drawBall(model.ball);

                window.requestAnimationFrame(animate);
            };

            window.requestAnimationFrame(animate);
        }
    };
});
