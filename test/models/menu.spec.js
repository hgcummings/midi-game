define(['menu'], function(menu) {
    describe('menu', function() {
        var model, channels;

        beforeEach(function() {
            channels = [];
            model = {
                outputs: [
                    { id: 0, name: 'Microsoft GS Wavetable Synth' },
                    { id: 2, name: 'QuickTime Music Synthesizer' }
                ],
                selectOutput: jasmine.createSpy(),
                getChannel: function(channel) {
                    channels[channel] = {
                        playNote: jasmine.createSpy()
                    };
                    return channels[channel];
                }
            };
            loadFixtures('menu.html');
        });

        it('displays a list of available midi outputs', function() {
            init();

            expect($('#menu #output option').length).toBe(2);
            expect($('#menu #output option').eq(0).attr('value')).toBe('0');
            expect($('#menu #output option').eq(0).text()).toBe(model.outputs[0].name);

            expect($('#menu #output option').eq(1).attr('value')).toBe('2');
            expect($('#menu #output option').eq(1).text()).toBe(model.outputs[1].name);
        });

        it('chooses the selected midi value', function() {
            init();

            $('#menu #output').val(2).change();

            expect(model.selectOutput).toHaveBeenCalledWith(2);
        });

        it('chooses the first output by default', function() {
            init();
            expect(model.selectOutput).toHaveBeenCalledWith(0);
        });

        it('sends a note on test', function() {
            init();

            $('#menu button').click();
            expect(channels[0].playNote).toHaveBeenCalled();
        });

        function init() {
            menu.init(document.getElementById('menu'), model);
        }
    });

});