define(['output/wavetable-6'], function(wavetable) {
    'use strict';
    var CONCERT_A_HERTZ = 440;

    return {
        init: function(callback) {
            if (window.AudioContext) {
                var frequencies = [];
                for (var midiNote = 0; midiNote < 128; ++midiNote) {
                    frequencies[midiNote] = Math.pow(2, (midiNote - 69) / 12) * CONCERT_A_HERTZ;
                }

                var context = new AudioContext();
                var wave = context.createPeriodicWave(
                    new Float32Array(wavetable.real.map(wavetable.uncompress)),
                    new Float32Array(wavetable.imag.map(wavetable.uncompress)));

                var createSound = function(note) {
                    var oscillator = context.createOscillator();
                    oscillator.type = 4;
                    oscillator.setPeriodicWave(wave);
                    oscillator.frequency.value = frequencies[note];
                    var gainNode = context.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(context.destination);
                    oscillator.start(context.currentTime);
                    gainNode.gain.setValueAtTime(1, context.currentTime);

                    return {
                        rampVolume: gainNode.gain.linearRampToValueAtTime.bind(gainNode.gain),
                        stop: oscillator.stop.bind(oscillator)
                    };
                };

                var getChannel = function() {
                    var playNote = function(note, duration) {
                        var sound = createSound(note);
                        sound.rampVolume(0, context.currentTime + duration / 1000);
                        sound.stop(context.currentTime + duration / 1000);
                    };

                    var startNote = function(note) {
                        var sound = createSound(note);

                        return {
                            stop: function() {
                                sound.rampVolume(0, context.currentTime + 0.3);
                                sound.stop(context.currentTime + 0.3);
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
