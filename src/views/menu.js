define(['data/colours', 'data/dimensions', 'data/levels', 'data/progress',
    'views/util', 'views/game',
    'models/game',
    'input/keyboard', 'input/tutorial',
    'output/sound', 'output/audio'
],
function(c, d, levels, progress, util, gameView, gameModel, keyboard, tutorial, sound, audio) {
    'use strict';
    return {
        init: function(callback) {
            audio.init(function(output) {
                var menu = document.createElement('div');
                menu.style.width = d.WIDTH + 'px';
                menu.style.height = d.HEIGHT + 'px';
                menu.setAttribute('id', 'menu');

                var title = document.createElement('h1');
                title.appendChild(document.createTextNode('Menu'));
                menu.appendChild(title);

                levels.forEach(function(level, i) {
                    level.id = i;

                    var link = document.createElement('a');
                    link.classList.add('level');
                    link.style.display = 'block';
                    link.style.height = d.HEIGHT * 0.4 + 'px';
                    var startLevel = function(e) {
                        e.preventDefault();
                        menu.style.display = 'none';
                        var input = i === 0 ? tutorial : keyboard;
                        gameView.init(menu.parentNode, gameModel.init(level, input.init(), sound.init(output)));
                    };

                    var title = document.createElement('h2');
                    var contents = [title];

                    var bestTime = progress.getTime(i);
                    if (bestTime) {
                        title.appendChild(document.createTextNode(level.name));
                        link.style.borderColor = c.NOTES[1 + (i % 7)];

                        var best = document.createElement('h3');
                        best.innerHTML = '&#8987; ' + util.formatTime(bestTime);
                        contents.push(best);

                        var stars = document.createElement('h4');
                        contents.push(stars);
                        var starsHtml = '';

                        for (var p = 0; p < level.par.length; ++p) {
                            if (bestTime < level.par[p]) {
                                starsHtml += '&#9733;';
                            } else {
                                starsHtml += '&#9734;';
                            }
                        }

                        stars.innerHTML = starsHtml;
                        link.onclick = startLevel;
                    } else if (i < 2 || progress.getTime(i - 1) || progress.getTime(i - 2)) {
                        title.appendChild(document.createTextNode(level.name));

                        var start = document.createElement('h3');
                        start.appendChild(document.createTextNode('Click to start'));

                        contents.push(start);
                        link.onclick = startLevel;
                    } else {
                        link.classList.add('locked');
                        title.appendChild(document.createTextNode('?'));
                    }

                    contents.forEach(function(content) {
                        link.appendChild(content);
                    });

                    menu.appendChild(link);
                });

                callback(menu);
            });
        }
    };
});