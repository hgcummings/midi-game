require(['views/game', 'data/levels', 'models/game', 'input/keyboard', 'output/sound', 'output/audio'],
    function(view, levels, model, input, sound, audio) {
        audio.init(function(output) {
            document.getElementById('warning').remove();
            view.init(document.getElementById('game'), model.init(levels[0], input.init(), sound.init(output)));
        });
    }
);
