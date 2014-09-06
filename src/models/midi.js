define(function () {
    var NOTE_ON = 0x90;
    var NOTE_OFF = 0x80;
    var PROGRAM_CHANGE = 0xC0;

    return {
        init: function (callback) {
            if (navigator && navigator.requestMIDIAccess()) {
                navigator.requestMIDIAccess().then(function (midiAccess) {
                    var outputs = [];
                    var selectedOutput = null;

                    for (var i = 0; i < midiAccess.outputs().length; ++i) {
                        var output = midiAccess.outputs()[i];
                        outputs.push(output);
                    }

                    if (outputs.length) {
                        var selectOutput = function (outputId) {
                            selectedOutput = outputs[outputId];
                        };

                        var getChannel = function (channel) {
                            var output = selectedOutput;

                            var playNote = function (note, duration) {
                                output.send([NOTE_ON + channel, note, 127]);
                                output.send([NOTE_OFF + channel, note, 64], window.performance.now() + duration);
                            };

                            var selectInstrument = function (instrument) {
                                output.send([PROGRAM_CHANGE + channel, instrument]);
                            };

                            return {
                                selectInstrument: selectInstrument,
                                playNote: playNote
                            };
                        };

                        callback({
                            outputs: outputs,
                            selectOutput: selectOutput,
                            getChannel: getChannel
                        });
                    }
                });
            }
        }
    };
});
