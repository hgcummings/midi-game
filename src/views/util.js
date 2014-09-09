define(function() {
    return {
        drawCircle: function(context, fillStyle, x, y, radius) {
            context.beginPath();
            context.fillStyle = fillStyle;
            context.arc(Math.round(x), Math.round(y), radius, 2 * Math.PI, false);
            context.fill();
            context.closePath();
        },
        drawRoundedRect: function(context, x, y, w, h, r) {
            context.beginPath();
            context.arc(x + r, y + r, r, Math.PI, Math.PI * 3 / 2, false);
            context.lineTo(x + w - r, y);
            context.arc(x + w - r, y + r, r, Math.PI * 3 / 2, 0, false);
            context.lineTo(x + w, y + h - r);
            context.arc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
            context.lineTo(x + r, y + h);
            context.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
            context.lineTo(x, y + r);
        }
    };
});