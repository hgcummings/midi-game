define(['data/constants', 'models/physics'], function(constants, physics) {
    var topPlane = physics.createPlane([0, 1], constants.BORDER);
    var leftPlane = physics.createPlane([1, 0], constants.BORDER);
    var rightPlane = physics.createPlane([-1, 0], constants.WIDTH - constants.BORDER);
    
    var planes = [topPlane, leftPlane, rightPlane];
    
    return {
        init: function() {
            return {
                getCollisionPlanes: function() { return planes; }
            };
        }
    };
});