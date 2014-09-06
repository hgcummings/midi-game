define(['models/maths'], function(maths) {
    var getDistanceToPlane = function(plane, particle) {
        return maths.dotProduct([particle.x, particle.y], plane.normal()) -
            maths.dotProduct(plane.position(), plane.normal());
    };
    
    var getCollisionTime = function(plane, particle) {
        var distanceToPlane = getDistanceToPlane(plane, particle);
        var speedToPlane = -maths.dotProduct([particle.dx, particle.dy], plane.normal());
        var timeToPlane = distanceToPlane / speedToPlane;
        return timeToPlane;
    };

    return {
        /**
         * Calculate the reflection vector based on the incident velocity and the unit normal
         */
        reflectionV: function(v, n) {
            var vn = maths.dotProduct(v, n);
            return [
                v[0] - 2 * n[0] * vn,
                v[1] - 2 * n[1] * vn
            ];
        },
        createPlane: function(normal, position, collisionCallback) {
            if (typeof position === 'number') {
                var staticPosition = [Math.abs(normal[0]) * position, Math.abs(normal[1]) * position];
                position = function() { return staticPosition; };
            }
            
            return {
                normal: function() { return normal },
                position: position,
                collideAt: collisionCallback || (function() { return normal; })
            }
        },
        distanceToPlane: getDistanceToPlane,
        sortByCollisionTime: function (planes, particle) {
            var result = planes.concat();
            result.forEach(function(plane) {
                plane.collisionTime = getCollisionTime(plane, particle);
            });
            result.sort(function(a, b) {
                return a.collisionTime - b.collisionTime;
            });
            return result;
        }
    };
});
