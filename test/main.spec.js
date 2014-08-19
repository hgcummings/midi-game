describe('main', function() {
    beforeEach(function() {
        loadFixtures('game.html');
    });

    it('should display message', function() {
        require(['main'], function() {
            expect($('#game.h2')).toHaveText("Hello World!");
        });
    });
});