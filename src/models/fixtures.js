define(['data/constants', 'models/physics'], function(constants, physics) {
    var topPlane = physics.simplePlane([0, 1], constants.BORDER);
    var leftPlane = physics.simplePlane([1, 0], constants.BORDER);
    var rightPlane = physics.simplePlane([-1, 0], constants.WIDTH - constants.BORDER);
    
    var planes = [topPlane, leftPlane, rightPlane];
    
    return {
        init: function() {
            return {
                getCollisionPlanes: function() { return planes; }
            };
        }
    };
});