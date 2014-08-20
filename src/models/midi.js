define(function() {
    var NOTE_ON = 0x90;
    var NOTE_OFF = 0x80;
    var PROGRAM_CHANGE = 0xC0;

    return {
        init: function(midiAccess) {
            var outputs = [];
            var selectedOutput = null;
            var selectedPatch = 0;

            for (var i = 0; i < midiAccess.outputs().length; ++i) {
                var output = midiAccess.outputs()[i];
                outputs.push(output);
            }

            var selectOutput = function(outputId) {
                selectedOutput = outputs[outputId];
                selectInstrument(selectedPatch);
            };

            var playNote = function(note, duration) {
                selectedOutput.send([NOTE_ON, note, 127]);
                selectedOutput.send([NOTE_OFF, note, 64], window.performance.now() + duration);
            };

            var selectInstrument = function(instrument) {
                selectedPatch = instrument;
                selectedOutput.send([PROGRAM_CHANGE, instrument]);
            };

            return {
                outputs: outputs,
                selectOutput: selectOutput,
                selectInstrument: selectInstrument,
                playNote: playNote
            }
        }
    }
});