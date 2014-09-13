define(['data/colours', 'data/dimensions', 'views/util', 'input/keyboard'], function(c, d, util, keyboard) {
    'use strict';
    return {
        init: function() {
            var canvas = document.createElement('canvas');
            canvas.width = d.WIDTH;
            canvas.height = d.HEIGHT;
            canvas.classList.add('keyMap');
            
            var context = canvas.getContext('2d');
            var keySize = d.CORNER;
            
            var drawKey = function(x, y, fillStyle, textStyle, name) {
                util.drawRoundedRect(context, x, y, keySize, keySize, keySize / 8);
                context.fillStyle = fillStyle;
                context.fill();
                util.drawText(
                    context,
                    name,
                    textStyle,
                    x + keySize / 8,
                    y,
                    keySize / 2,
                    'left',
                    'top'
                );
            };
            
            var noteSpacing = keySize / 3;
            var notesTop = d.HEIGHT - 2 * d.BLOCK.MARGIN.Y;
            var notesLeft = (d.WIDTH - (7 * keySize) - 6 * noteSpacing) / 2;
            
            var drawNote = function(note) {
                var x = notesLeft +
                    (Math.floor(note) + (note % 1) * 3 / 2 - 1) * keySize +
                    Math.floor(note - 1) * noteSpacing;
                var y = notesTop;

                if (note === Math.floor(note)) {
                    y += keySize + noteSpacing;
                }

                drawKey(x, y, c.NOTES[note], c.FOREGROUND, String.fromCharCode(keyboard.noteMap.indexOf(note)));
            };
            
            for (var note in c.NOTES) {
                if (c.NOTES.hasOwnProperty(note)) {
                    drawNote(parseFloat(note));
                }
            }
            
            var drawElement = function(num) {
                var x = keySize / 2;
                var textAlign = 'left';
                var textX = x;
                if (num > 2) {
                    x = d.WIDTH - 3 * keySize / 2;
                    textAlign = 'right';
                    textX = x + keySize;
                }
                var y = keySize / 2;
                var textY = y + 3 * keySize / 2;
                if (num === 1 || num === 4) {
                    y = d.HEIGHT - 3 * keySize / 2;
                    textY = y - keySize / 2;
                }

                drawKey(x, y, c.FOREGROUND, c.BACKGROUND, num);      
                util.drawText(
                    context,
                    keyboard.actionMap[num.toString().charCodeAt(0)],
                    c.FOREGROUND,
                    textX,
                    textY,
                    keySize * 2 / 3,
                    textAlign,
                    'middle'
                );
            };
            
            for (var i = 1; i <= 4; ++i) {
                drawElement(i);
            }
            
            var drawDirection = function(direction, key, name) {
                var x = notesLeft + 3 * keySize + 3 * noteSpacing + direction * 4.5 * (keySize + noteSpacing);
                var y = notesTop + 2 * (keySize + noteSpacing);
                drawKey(x, y, c.BACKGROUND, c.FOREGROUND, key);

                util.drawText(
                    context,
                    name.toUpperCase(),
                    c.FOREGROUND,
                    x + (-3 * direction + 2) * keySize / 4,
                    y + keySize / 2,
                    keySize * 2 / 3,
                    name,
                    'middle'
                );
            };
            
            drawDirection(-1, 'Z', 'left');
            drawDirection(1, '/', 'right');
            
            return canvas;
        },
        drawHint: function(context, model) {
            var hint = model.getHint();
            if (hint) {
                util.drawText(
                    context,
                    hint,
                    c.FOREGROUND,
                    d.WIDTH / 2,
                    d.HEIGHT - d.BLOCK.MARGIN.Y,
                    d.CORNER * 3 / 4,
                    'center',
                    'middle'
                );
            }
        } 
    };
});