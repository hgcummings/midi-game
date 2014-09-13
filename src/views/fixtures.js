define(['data/colours', 'data/dimensions', 'views/util'], function(c, d, util) {
    return {
        init: function(context, model) {
            var gap = d.CORNER - d.BORDER;
            var inner = d.BORDER - gap;
            var totalSpareLives = model.remainingLives;

            var elements = ['AIR', 'FIRE', 'EARTH', 'WATER'];
            var gradients = [];

            var prevLives = -1;
            var prevElements = -1;

            var cachedCanvas = document.createElement('canvas');
            cachedCanvas.width = d.WIDTH;
            cachedCanvas.height = d.HEIGHT;
            var cachedContext = cachedCanvas.getContext('2d');

            for (var i = 0; i < 2; ++i) {
                for (var j = 0; j < 2; ++j) {
                    var x = i * (d.WIDTH - d.CORNER) + d.CORNER / 2;
                    var y = j * (d.HEIGHT - d.CORNER) + d.CORNER / 2;

                    var gradient = cachedContext.createRadialGradient(x, y, 0, x, y, d.CORNER / 2);
                    for (var k = 0; k < 2; ++k) {
                        gradient.addColorStop(k, c.ELEMENTS[elements[i + 2 * j]][k]);
                    }
                    gradients[i + 2 * j] = gradient;
                }
            }

            return {
                drawBorder: function(model) {
                    if (prevElements !== model.remainingElements.length || prevLives !== model.remainingLives) {
                        cachedContext.fillStyle = c.FIXTURES.BORDER;
                        cachedContext.fillRect(0, gap, d.WIDTH, inner);
                        cachedContext.fillRect(gap, 0, inner, d.HEIGHT);
                        cachedContext.fillRect(d.WIDTH - d.CORNER + gap, 0, inner, d.HEIGHT);

                        for (var life = 0; life <= totalSpareLives; ++life) {
                            var x = (life - totalSpareLives / 2) * d.BORDER + d.WIDTH / 2;
                            var y = (d.BORDER + gap) / 2;
                            util.drawCircle(cachedContext, c.FIXTURES.SLOT, x, y, d.BALL.RADIUS + 2);
                            if (model.remainingLives > life) {
                                util.drawCircle(cachedContext, c.BALL, x, y, d.BALL.RADIUS);
                            }
                        }

                        cachedContext.fillStyle = c.FIXTURES.CORNER;
                        cachedContext.strokeStyle = c.FIXTURES.SLOT;
                        for (var i = 0; i < 2; ++i) {
                            for (var j = 0; j < 2; ++j) {
                                cachedContext.fillRect(
                                    i * (d.WIDTH - d.CORNER),
                                    j * (d.HEIGHT - d.CORNER),
                                    d.CORNER,
                                    d.CORNER
                                );
                                cachedContext.save();
                                cachedContext.lineWidth = 4;
                                if (model.remainingElements.indexOf(elements[i + 2 * j]) !== -1) {
                                    cachedContext.fillStyle = gradients[i + 2 * j];
                                } else {
                                    cachedContext.fillStyle = c.FIXTURES.SLOT;
                                }
                                util.drawRoundedRect(cachedContext,
                                    i * (d.WIDTH - d.CORNER) + d.CORNER / 6,
                                    j * (d.HEIGHT - d.CORNER) + d.CORNER / 6,
                                    2 * d.CORNER / 3,
                                    2 * d.CORNER / 3,
                                    d.CORNER / 12);
                                cachedContext.stroke();
                                cachedContext.fill();
                                cachedContext.restore();
                            }
                        }

                        prevElements = model.remainingElements.length;
                        prevLives = model.remainingLives;
                    }

                    context.drawImage(cachedCanvas, 0, 0);
                    context.font = d.BORDER * 2 / 3 + 'px "Gill Sans MT","Gill Sans",Calibri,sans-serif';
                    context.fillStyle = c.FOREGROUND;
                    context.textBaseline = 'middle';
                    context.textAlign = 'right';
                    context.fillText(util.formatTime(model.gameTime / 1000),
                        d.WIDTH - d.BLOCK.MARGIN.X, (d.BORDER + gap) / 2);
                    context.textAlign = 'left';
                    context.fillText(model.levelName, d.BLOCK.MARGIN.X, (d.BORDER + gap) / 2);
                }
            };
        }
    };
});
