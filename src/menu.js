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

            element.appendChild(select);
        }
    }
});