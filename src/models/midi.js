define(function() {
    var NOTE_ON = 0x90;
    var NOTE_OFF = 0x80;

    return {
        init: function(midiAccess) {
            var outputs = [];
            var selectedOutput = null;

            for (var i = 0; i < midiAccess.outputs().length; ++i) {
                var output = midiAccess.outputs()[i];
                outputs.push(output);
            }

            var selectOutput = function(outputId) {
                selectedOutput = outputs.get(outputId);
            };

            var playNote = function(note) {
                selectedOutput.send([NOTE_ON, note, 127]);
                selectedOutput.send([NOTE_OFF, note, 64], window.performance.now() + 1000.0 );
            };

            return {
                outputs: outputs,
                selectOutput: selectOutput,
                playNote: playNote
            }
        }
    }
});