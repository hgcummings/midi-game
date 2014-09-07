define(function() {
    var scaleDegrees = [1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7];
    var baseNote = 60;
    return {
        getMidiNote:function(note) {
            return baseNote + scaleDegrees.indexOf(note);
        },
        init: function(output) {
            var hitChannel = output.getChannel(0);
            var bounceChannel = output.getChannel(1);
            hitChannel.selectInstrument(53);
            bounceChannel.selectInstrument(98);
            
            return {
                playHit: function(midiNote) {
                    hitChannel.playNote(midiNote, 1000);
                },
                playBounce: function(midiNote) {
                    bounceChannel.playNote(midiNote, 1000);
                }
            };
        }
    };
});