define(['data/progress'], function(progress) {
    describe('progress', function() {
        beforeEach(function() {
            localStorage.clear();
        });
        
        it('returns null when no time is stored for a level', function() {
            expect(progress.getTime(0)).toBeNull();
        });
        
        it('stores level times', function() {
            var saved = 123;
            progress.saveTime(1, 123);
            
            var loaded = progress.getTime(1);
            
            expect(loaded).toBe(saved);
        });

        it('only stores the best recorded time', function() {
            var saved = 123;
            progress.saveTime(1, 123);
            progress.saveTime(1, 234);

            var loaded = progress.getTime(1);

            expect(loaded).toBe(saved);
        });
    });
});