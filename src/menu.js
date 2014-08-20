define('menu', function() {
    return {
        init: function (element, midi) {
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

            var button = document.createElement('button');
            var buttonText = document.createTextNode('Test');
            button.appendChild(buttonText);

            button.onclick = function() {
                midi.playNote(65, 1000);
            };

            element.appendChild(button);
        }
    }
});