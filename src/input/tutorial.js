define(['input/keyboard'], function(keyboard) {
    'use strict';
    return {
        init: function() {
            var realInput = keyboard.init();

            var allowMovement = false;
            var allowedActions = [];
            var currentState = null;
            var stateData;

            var enterState = function(i, model) {
                currentState = i;
                stateData = {};
                states[i].init(model);
            };

            var states = [
                {
                    hint: 'Press SPACE to launch the ball..',
                    test: function(model) { return model.ball.released; },
                    init: function() { allowedActions.push('LAUNCH'); }
                },
                {
                    hint: 'To clear the block, the ball must match its note.\nTry pressing D...',
                    test: function(model) { return model.blocks.all[2][3].hit; },
                    init: function() { }
                },
                {
                    hint: 'This next block has a different note. Try pressing G...',
                    test: function(model) { return model.blocks.all[1][3].hit; },
                    init: function() { }
                },
                {
                    hint: 'This block has another note again. Try pressing J...',
                    test: function(model) { return model.blocks.all[0][3].hit; },
                    init: function() { }
                },
                {
                    hint: 'You can move the paddle left and right with the Z and / keys...',
                    test: function(model) { return model.paddle.x !== stateData.initialPaddleX; },
                    init: function(model) { allowMovement = true; stateData.initialPaddleX = model.paddle.x; }
                },
                {
                    hint: 'Finally, you can activate special elemental powers! Try pressing 3...',
                    test: function(model) { return model.remainingElements.length < 4; },
                    init: function() { allowedActions.push('FIRE'); }
                },
                {
                    hint: null,
                    test: function(model) { return !model.ball.mode.element; },
                    init: function() {}
                },
                {
                    hint: 'You can pause the game at any time and view help by pressing P...',
                    test: function(model) {
                        return model.gameTime + 500 - stateData.gameTime < new Date().getTime() - stateData.startTime;
                    },
                    init: function(model) {
                        allowedActions.push('PAUSE', 'EARTH', 'AIR', 'WATER');
                        stateData.gameTime = model.gameTime;
                        stateData.startTime = new Date().getTime();
                    }
                },
                {
                    hint: null,
                    test: function() { return false; },
                    init: function() {}
                }
            ];

            enterState(0);

            var self = {};

            self.getHint = function(model) {
                var state = states[currentState];

                if (state.test(model)) {
                    enterState(currentState + 1, model);
                }

                return state.hint;
            };

            self.getNote = function() {
                return realInput.getNote();
            };

            self.getDirection = function() {
                if (!allowMovement) {
                    return 0;
                }
                return realInput.getDirection();
            };

            self.getAction = function() {
                var realAction = realInput.getAction();
                if (allowedActions.indexOf(realAction) !== -1) {
                    return realAction;
                }
                return null;
            };

            self.clearAction = function() {
                return realInput.clearAction();
            };

            return self;
        }
    };
});
