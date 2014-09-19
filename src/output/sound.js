define(function() {
    'use strict';
    var scaleDegrees = [1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7];
    var baseNote = 60;
    return {
        getMidiNote: function(note) {
            return baseNote + scaleDegrees.indexOf(note);
        },
        init: function(output) {
            var channel = output.getChannel();

            return {
                playHit: function(midiNote) {
                    channel.playNote(midiNote, 1000);
                },
                playBounce: function(midiNote) {
                    channel.playNote(midiNote, 1000);
                },
                startNote: function(midiNote) {
                    return channel.startNote(midiNote);
                }
            };
        }
    };
});