define(['models/physics'], function(physics) {
    describe('physics', function() {
        
        describe('nextCollisionPlane', function() {
            it('returns the next plane with which the particle will collide', function() {
                var passed = { normal: [0, -1],  position: [0, 80] };
                var horizontal = { normal: [0, -1], position: [0, 100] };
                var vertical = { normal: [-1, 0], position: [100, 0] };
                
                var particle = { x: 80, y: 90, dx: 5, dy: 2 };
                
                var result = physics.nextCollisionPlane([passed, horizontal, vertical], particle);
                
                expect(result).toBe(vertical);
            });
            
        describe('getDistanceToPlane', function() {
            it('returns distance from particle to plane', function() {
                var topPlane = { normal: [0, 1], position: [0, 10] };
                var bottomPlane = { normal: [0, -1], position: [0, 90] };
                var particle = { x: 50, y:50, dx: 0, dy: 2 };

                expect(physics.distanceToPlane(topPlane, particle)).toBe(40);
                expect(physics.distanceToPlane(bottomPlane, particle)).toBe(40);
            });
        });
            

        });
    });
});