define(['models/maths'], function(maths) {
    var getDistanceToPlane = function(plane, particle) {
        var position = [
            plane.position()[0] + particle.r * plane.positionNormal()[0],
            plane.position()[1] + particle.r * plane.positionNormal()[1],
        ];
        return maths.dotProduct([particle.x, particle.y], plane.positionNormal()) -
            maths.dotProduct(position, plane.positionNormal());
    };
    
    var getCollisionTime = function(object, particle) {
        var distanceToObject = object.distance(particle);
        var speedToObject = -maths.dotProduct([particle.dx, particle.dy], object.positionNormal(particle));
        var timeToObject = distanceToObject / speedToObject;
        return timeToObject;
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
        createPoint: function(type, x, y, collisionCallback) {
            var position = [x, y];
            var self = {
                type: type,
                position: function() { return position; },
                positionNormal: function(particle) {
                    return maths.normalise([particle.x - x, particle.y - y]);
                },
                collideAt: function(particleX, particleY, gameTime, note) {
                    if (!collisionCallback || collisionCallback(particleX, particleY, gameTime, note)) {
                        return maths.normalise([particleX - x, particleY - y]);
                    } else {
                        return null;
                    }
                }
            };
            
            self.distance = function(particle) {
                return maths.cartesianDistance(position, [particle.x, particle.y]) - particle.r;
            };
            
            return self;
        },
        createPlane: function(type, normal, position, collisionCallback) {
            if (typeof position === 'number') {
                var staticPosition = [Math.abs(normal[0]) * position, Math.abs(normal[1]) * position];
                position = function() { return staticPosition; };
            }
            
            var self = {
                type: type,
                positionNormal: function() { return normal; },
                position: position,
                collideAt: collisionCallback || (function() { return normal; })
            };
            
            self.distance = function(particle) { return getDistanceToPlane(self, particle); };
            
            return self;
        },
        sortByCollisionTime: function (objects, particle) {
            var result = objects.concat();
            result.forEach(function(object) {
                object.collisionTime = getCollisionTime(object, particle);
            });
            result.sort(function(a, b) {
                return a.collisionTime - b.collisionTime;
            });
            return result;
        }
    };
});
