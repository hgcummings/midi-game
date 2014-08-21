define('view', function() {
    return {
        init: function(element, model) {
            var message = document.createElement('h2');
            var text = document.createTextNode(model.text);
            message.appendChild(text);
            element.appendChild(message);
        }
    }
});