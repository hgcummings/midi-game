define(['models/physics'], function(physics) {
    'use strict';
    describe('physics', function() {
        
        describe('sortByCollisionTime', function() {
            it('returns the planes in the order with which particle will collide', function() {
                var passed = physics.createPlane(null, [0, -1], 80);
                var horizontal = physics.createPlane(null, [0, -1], 100);
                var vertical = physics.createPlane(null, [-1, 0], 100);

                var particle = { x: 80, y: 90, dx: 5, dy: 2, r: 2 };

                var result = physics.sortByCollisionTime([passed, horizontal, vertical], particle);

                expect(result).toEqual([passed, vertical, horizontal]);
            });
        });
            
        describe('get distance to plane', function() {
            it('returns distance from particle to plane', function() {
                var topPlane = physics.createPlane(null, [0, 1], 10);
                var bottomPlane = physics.createPlane(null, [0, -1], 90);
                var particle = { x: 50, y:50, dx: 0, dy: 2, r:5 };

                expect(topPlane.distance(particle)).toBe(35);
                expect(bottomPlane.distance(particle)).toBe(35);
            });
        });
        
        describe('get distance to point', function() {
            it('returns distance from particle to point', function() {
                var point = physics.createPoint(null, 10, 10);
                
                var particle = { x: 13, y: 14, r:2 };
                
                expect(point.distance(particle)).toBe(3);
            });
        });
        
        describe('collide with point', function() {
            it ('returns normalised vector from point to particle', function() {
                var point = physics.createPoint(null, 10, 10);

                var headOnCollision = { x: 10, y: 20, r:2 };
                var glancingCollsion = { x: 17, y: 17, r:2 };

                expect(point.collideAt(headOnCollision.x, headOnCollision.y)).toEqual([0, 1]);
                
                var glancingResult = point.collideAt(glancingCollsion.x, glancingCollsion.y);
                expect(glancingResult[0]).toBeCloseTo(1 / Math.sqrt(2), 10);
                expect(glancingResult[1]).toBeCloseTo(1 / Math.sqrt(2), 10);
            });
        });
    });
});