require(['data/dimensions', 'views/menu'], function(d, menuView) {
    'use strict';
    var gameElement = document.getElementById('game');
    gameElement.style.width = d.WIDTH + 'px';
    gameElement.style.height = d.HEIGHT + 'px';
    gameElement.style.fontSize = d.PERCENT + '%';
    gameElement.style.marginTop = (window.innerHeight - d.HEIGHT) / 4 + 'px';

    menuView.init(function(menuElement) {
        document.getElementById('warning').remove();
        gameElement.appendChild(menuElement);
    });
});
