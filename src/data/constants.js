define(function() {
    var defaultWidth = 768;
    var defaultHeight = 432;
    var scaleFactor = Math.max(0.5,
        Math.min(window.innerHeight / defaultHeight, window.innerWidth / defaultWidth));
    
    var scale = function(number) {
        return Math.round(number * scaleFactor);
    };
    
    return {
        WIDTH: scale(defaultWidth),
        HEIGHT: scale(defaultHeight),
        BORDER: scale(28),
        CORNER: scale(32),
        BLOCK: {
            SPACING: { X: scale(40), Y: scale(40) },
            SIZE: { X: scale(32), Y: scale(18) },
            MARGIN: { X: scale(64), Y: scale(76) },
            RADIUS: scale(2)
        },
        PADDLE: {
            SIZE: { X: scale(64), Y: scale(8) },
            MARGIN: { X: scale(32), Y: scale(8) },
            RADIUS: scale(256)
        },
        BALL: {
            RADIUS: scale(5)
        }
    };
});