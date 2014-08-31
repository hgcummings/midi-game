define(['data/levels', 'input/keyboard'], function(levels, keyboard) {
    return {
        init: function (element, midi) {
            var self = {};
            var hide = function() {
                element.style.setProperty('display', 'none');
            };

            if (midi.outputs.length === 1) {
                self.registerStart = function(callback) {
                    callback(levels[0], keyboard);
                };
                hide();
                return self;
            }

            var select = document.createElement('select');
            select.setAttribute('id', 'output');

            for (var i = 0; i < midi.outputs.length; ++i) {
                var output = midi.outputs[i];
                var option = document.createElement('option');
                option.setAttribute('value', output.id);
                var description = document.createTextNode(output.name);
                option.appendChild(description);
                select.appendChild(option);
            }

            var updateOutput = function() {
                midi.selectOutput(parseInt(select.value, 10));
            };

            select.onchange = updateOutput;
            element.appendChild(select);
            updateOutput();

            function createButton(text, cssClass) {
                var button = document.createElement('button');
                var testText = document.createTextNode(text);
                button.appendChild(testText);
                button.classList.add(cssClass);
                element.appendChild(button);
                return button;
            }

            var testButton = createButton('Test', 'test');
            testButton.onclick = function() {
                midi.getChannel(0).playNote(65, 1000);
            };

            var startCallbacks = [];
            var startButton = createButton('Start!', 'start');
            startButton.onclick = function() {
                hide();
                for (var i = 0; i < startCallbacks.length; ++i) {
                    startCallbacks[i](levels[0], keyboard);
                }
            };

            self.registerStart = function(callback) {
                startCallbacks.push(callback);
                return self;
            };

            return self;
        }
    };
});
