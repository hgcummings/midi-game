require(['menu', 'output/midi', 'views/game', 'models/game', 'output/sound'], function(menu, midi, view, model, sound) {
    midi.init(function(midiModel) {
        document.getElementById('warning').remove();
        menu.init(document.getElementById('menu'), midiModel).registerStart(function(level, input) {
            view.init(document.getElementById('game'), model.init(level, input.init(), sound.init(midiModel)));
        });
    });
});
