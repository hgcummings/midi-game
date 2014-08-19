define(['menu'], function(menu) {
    describe('menu', function() {
        var model;

        beforeEach(function() {
            model = {};
            loadFixtures('menu.html');
        });

        it('displays a list of available midi outputs', function() {
            model.outputs = [
                { id: 0, name: 'Microsoft GS Wavetable Synth' },
                { id: 2, name: 'QuickTime Music Synthesizer' }
            ];

            menu.init(document.getElementById('menu'), model);

            expect($('#menu #output option').length).toBe(2);
            expect($('#menu #output option').eq(0).attr('value')).toBe('0');
            expect($('#menu #output option').eq(0).text()).toBe(model.outputs[0].name);

            expect($('#menu #output option').eq(1).attr('value')).toBe('2');
            expect($('#menu #output option').eq(1).text()).toBe(model.outputs[1].name);
        });

        it('chooses the selected midi value', function() {

        });
    });

});