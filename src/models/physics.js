define(['models/maths'], function(maths) {
    var getDistanceToPlane = function(plane, particle) {
        return maths.dotProduct([particle.x, particle.y], plane.normal) -
            maths.dotProduct(plane.position, plane.normal);
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
        simplePlane: function(normal, distance) {
            return {
                normal: normal,
                position: [Math.abs(normal[0]) * distance, Math.abs(normal[1]) * distance],
                collideAt: (function() { return normal; })
            }
        },
        distanceToPlane: getDistanceToPlane,
        nextCollisionPlane: function(planes, particle) {
            var minTimeToPlane = Infinity;
            var closestPlane = null;
            planes.forEach(function(plane) {
                var distanceToPlane = getDistanceToPlane(plane, particle);
                var speedToPlane = -maths.dotProduct([particle.dx, particle.dy], plane.normal);
                var timeToPlane = distanceToPlane/speedToPlane;
                
                if (timeToPlane > 0 && timeToPlane < minTimeToPlane) {
                    minTimeToPlane = timeToPlane;
                    closestPlane = plane;
                }
            });
            return closestPlane;
        }
    };
});
