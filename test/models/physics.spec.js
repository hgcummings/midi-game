define(['models/physics'], function(physics) {
    describe('physics', function() {
        
        describe('sortByCollisionTime', function() {
            it('returns the planes in the order with which particle will collide', function() {
                var passed = physics.createPlane([0, -1], 80);
                var horizontal = physics.createPlane([0, -1], 100);
                var vertical = physics.createPlane([-1, 0], 100);

                var particle = { x: 80, y: 90, dx: 5, dy: 2 };

                var result = physics.sortByCollisionTime([passed, horizontal, vertical], particle);

                expect(result).toEqual([passed, vertical, horizontal]);
            });
        });
            
        describe('getDistanceToPlane', function() {
            it('returns distance from particle to plane', function() {
                var topPlane = physics.createPlane([0, 1], 10);
                var bottomPlane = physics.createPlane([0, -1], 90);
                var particle = { x: 50, y:50, dx: 0, dy: 2 };

                expect(physics.distanceToPlane(topPlane, particle)).toBe(40);
                expect(physics.distanceToPlane(bottomPlane, particle)).toBe(40);
            });
        });
    });
});