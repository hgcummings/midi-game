define(['data/dimensions', 'data/levels', 'views/game', 'models/game', 'input/keyboard', 'output/sound', 'output/audio'],
    function(d, levels, gameView, gameModel, input, sound, audio) {
    return {
        init: function(callback) {
            audio.init(function(output) {
                var menu = document.createElement('div');
                menu.style.width = d.WIDTH + 'px';
                menu.style.height = d.HEIGHT + 'px';
                menu.classList.add('menu');
                
                var createLevelLink = function(level) {
                    var link = document.createElement('a');
                    link.classList.add('level');
                    
                    var title = document.createElement('h2');
                    title.appendChild(document.createTextNode(level.name));
                    
                    var best = document.createElement('h3');
                    best.appendChild(document.createTextNode('1:23'));
                    
                    var stars = document.createElement('h4');
                    stars.innerHTML = '&#9733;&#9733;&#9734;';
                    
                    link.appendChild(title);
                    link.appendChild(best);
                    link.appendChild(stars);

                    link.onclick = function(e) {
                        e.preventDefault();
                        menu.style.display = 'none';
                        gameView.init(menu.parentNode, gameModel.init(level, input.init(), sound.init(output)));
                    };
                    
                    return link;
                };
                
                var title = document.createElement('h1');
                title.appendChild(document.createTextNode('Menu'));
                menu.appendChild(title);
                
                for (var i = 0; i < levels.length; ++i) {
                    menu.appendChild(createLevelLink(levels[i]));
                }
                
                callback(menu);
            });
        }
    }
});