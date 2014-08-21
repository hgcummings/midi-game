define(['model'], function(model) {
    describe('model', function() {
        it('should return a message', function() {
            var result = model.init();
            expect(result.text).toEqual('Hello World!');
        });
    })
});