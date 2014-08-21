require(['view', 'model'], function(view, model) {
    view.init(document.getElementById('game'), model.init());
});