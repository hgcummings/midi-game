require(['menu', 'models/midi', 'views/game', 'models/game'], function(menu, midi, view, model) {
    midi.init(function(midiModel) {
        document.getElementById('warning').remove();
        menu.init(document.getElementById('menu'), midiModel).registerStart(function() {
            view.init(document.getElementById('game'), model.init());
        });
    });
});