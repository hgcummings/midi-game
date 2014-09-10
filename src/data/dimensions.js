define(function() {
    var defaultWidth = 768;
    var defaultHeight = 432;
    var scaleFactor = Math.min(window.innerHeight / defaultHeight, window.innerWidth / defaultWidth);
    scaleFactor = Math.max(0.5, Math.floor(2 * scaleFactor) / 2);
    
    var scale = function(number) {
        return Math.round(number * scaleFactor);
    };
    
    return {
        WIDTH: scale(defaultWidth),
        HEIGHT: scale(defaultHeight),
        BORDER: scale(28),
        CORNER: scale(32),
        BLOCK: {
            MARGIN: { X: scale(68), Y: scale(68) },
            RATIO: 1.618,
            RADIUS: scale(2)
        },
        PADDLE: {
            SIZE: { X: scale(64), Y: scale(8) },
            MARGIN: { X: scale(32), Y: scale(8) }
        },
        BALL: {
            RADIUS: scale(5)
        }
    };
});