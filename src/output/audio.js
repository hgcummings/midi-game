define(function () {
    var CONCERT_A_HERTZ = 440;

    return {
        init: function (callback) {
            if (window.AudioContext) {
                var frequencies = [];
                for (var midiNote = 0; midiNote < 128; ++midiNote) {
                    frequencies[midiNote] = Math.pow(2, (midiNote - 69) / 12) * CONCERT_A_HERTZ;
                }
                
                var getChannel = function () {
                    var context = new AudioContext();
                    var waveform = 0;
                    
                    var playNote = function (note, duration) {
                        var oscillator = context.createOscillator();
                        oscillator.type = waveform;
                        oscillator.frequency.value = frequencies[note];
                        var gainNode = context.createGain();
                        oscillator.connect(gainNode);
                        gainNode.connect(context.destination);
                        oscillator.start(context.currentTime);
                        gainNode.gain.setValueAtTime(1, context.currentTime);
                        gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration / 1000);
                        oscillator.stop(context.currentTime + duration / 1000);
                    };
                    
                    var startNote = function(note) {
                        var oscillator = context.createOscillator();
                        oscillator.type = waveform;
                        oscillator.frequency.value = frequencies[note];
                        oscillator.connect(context.destination);
                        oscillator.start(context.currentTime);
                        
                        return {
                            stop: function() {
                                oscillator.stop(context.currentTime);
                            }
                        };
                    };
    
                    return {
                        playNote: playNote,
                        startNote: startNote
                    };
                };
    
                var output = {
                    getChannel: getChannel
                };
                
                callback(output);
            }
        }
    };
});
