require(['menu', 'models/midi', 'view', 'model'], function(menu, midi, view, model) {
    if (navigator && navigator.requestMIDIAccess()) {
        document.getElementById('warning').remove();
        navigator.requestMIDIAccess().then(function(midiAccess) {
            var midiModel = midi.init(midiAccess);
            menu.init(document.getElementById('menu'), midiModel);
            view.init(document.getElementById('game'), model.init());
        });
    }
});