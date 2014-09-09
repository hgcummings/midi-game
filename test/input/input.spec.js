define(['input/keyboard'], function(keyboard) {
    describe('keyboard input', function() {

        var input;

        beforeEach(function() {
            input = keyboard.init();
        });

        describe('getNote', function() {
            it('returns null if no key pressed', function() {
                expect(input.getNote()).toBeNull();
            });

            it('returns correct note for key press', function() {
                var verifyNoteForKeyPress = function(key, expectedNote) {
                    dispatchKeyDown(key);

                    var actualNote = input.getNote();

                    expect(actualNote).toBe(expectedNote);
                };

                verifyNoteForKeyPress('D', 1);
                verifyNoteForKeyPress('R', 1.5);
                verifyNoteForKeyPress('F', 2);
                verifyNoteForKeyPress('T', 2.5);
                verifyNoteForKeyPress('G', 3);
                verifyNoteForKeyPress('H', 4);
                verifyNoteForKeyPress('U', 4.5);
                verifyNoteForKeyPress('J', 5);
                verifyNoteForKeyPress('I', 5.5);
                verifyNoteForKeyPress('K', 6);
                verifyNoteForKeyPress('O', 6.5);
                verifyNoteForKeyPress('L', 7);
            });

            it('returns null after key is released', function() {
                dispatchKeyDown('H');
                dispatchKeyUp('H');

                expect(input.getNote()).toBeNull();
            });

        });

        describe('getDirection', function() {

            it('returns zero if no key is pressed', function() {
                expect(input.getDirection()).toBe(0);
            });

            it('returns correct direction for key press', function() {
                dispatchKeyDown('/');
                expect(input.getDirection()).toBe(1);

                dispatchKeyDown('Z');
                expect(input.getDirection()).toBe(-1);
            });

            it('returns zero after key is released', function() {
                dispatchKeyDown('/');
                dispatchKeyUp('/');

                expect(input.getDirection()).toBe(0);
            });

            it('ignores release of key no longer in effect', function() {
                dispatchKeyDown('/');
                dispatchKeyDown('Z');
                dispatchKeyUp('/');

                expect(input.getDirection()).toBe(-1);
            });
        });

        describe('getAction', function() {
            it('returns no-op if no key is pressed', function() {
                expect(input.getAction()).toBeNull();
            });

            it('returns correct action for key press', function() {
                var verifyActionForKeyPress = function(key, expectedAction) {
                    dispatchKeyDown(key);

                    var actualAction = input.getAction();

                    expect(actualAction).toBe(expectedAction);
                };

                verifyActionForKeyPress(' ', 'LAUNCH');
                verifyActionForKeyPress('1', 'EARTH');
                verifyActionForKeyPress('2', 'AIR');
                verifyActionForKeyPress('3', 'FIRE');
                verifyActionForKeyPress('4', 'WATER');
            });

            it('returns no-op after key is released', function() {
                dispatchKeyDown(' ');
                dispatchKeyUp(' ');

                expect(input.getAction()).toBeNull();
            });
        });


        var dispatchKeyDown = function(key) {
            dispatchKeyEvent('keydown', key);
        };

        var dispatchKeyUp = function(key) {
            dispatchKeyEvent('keyup', key);
        };

        var dispatchKeyEvent = function(eventName, key) {
            var keyCode = getKeyCode(key);
            var event = document.createEvent('HTMLEvents');
            event.initEvent(eventName, true, true);
            event.keyCode = keyCode;
            document.dispatchEvent(event);
        };

        var getKeyCode = function(key) {
            if ((key >= '0' && key <= '9') || (key >= 'A' && key <= 'Z') || key === ' ') {
                return key.charCodeAt(0);
            } else if (key === '/') {
                return 191;
            } else {
                throw new Error('Unknown key code for key "' + key + '"');
            }
        };

    });
});
