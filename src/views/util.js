define(function() {
    'use strict';
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
        },
        formatTime: function(seconds) {
            seconds = Math.round(seconds);
            return Math.floor(seconds / 60) + (seconds % 60 < 10 ? ':0' : ':') + seconds % 60;
        },
        drawText: function(context, text, fill, x, y, size, align, baseline) {
            context.save();
            context.font = size + 'px Candara,"Gill Sans MT","Gill Sans",Calibri,sans-serif';
            context.fillStyle = fill;
            context.textAlign = align;
            context.textBaseline = baseline;
            context.fillText(text, x, y);
            context.restore();
        }
    };
});