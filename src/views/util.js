define(function() {
    return {
        drawCircle: function(context, fillStyle, x, y, radius) {
            context.beginPath();
            context.fillStyle = fillStyle;
            context.arc(Math.round(x), Math.round(y), radius, 2 * Math.PI, false);
            context.fill();
            context.closePath();
        } 
    };
});