define(['menu'], function(menu) {
    describe('menu', function() {
        var model, channels;

        var createModel = function(outputs) {
            return {
                outputs: outputs,
                selectOutput: jasmine.createSpy(),
                getChannel: function(channel) {
                    channels[channel] = {
                        playNote: jasmine.createSpy()
                    };
                    return channels[channel];
                }
            };
        };

        var createOutput = function(id, name) {
            return { id: id, name: name };
        }

        beforeEach(function() {
            channels = [];
            model = createModel([
                createOutput(0, 'Microsoft GS Wavetable Synth'),
                createOutput(2, 'QuickTime Music Synthesizer')
            ]);
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

            $('#menu .test').click();
            expect(channels[0].playNote).toHaveBeenCalled();
        });

        it('calls start function on start', function() {
            var result = init();
            var startCallback = jasmine.createSpy();

            result.registerStart(startCallback);
            expect($('#menu .start').length).toBe(1);
            $('#menu .start').click();

            expect(startCallback).toHaveBeenCalled();
        });

        it('hides on start', function() {
            init();

            $('#menu .start').click();

            expect($('#menu')).toBeHidden();
        });

        it('hides immediately and executes start function if there is exactly one output', function () {
            var result = menu.init(document.getElementById('menu'), createModel(
                [ createOutput(0, 'Single output') ]
            ));

            expect($('#menu')).toBeHidden();

            var startCallback = jasmine.createSpy();
            result.registerStart(startCallback);
            expect(startCallback).toHaveBeenCalled();
        });

        function init() {
            return menu.init(document.getElementById('menu'), model);
        }
    });

});
