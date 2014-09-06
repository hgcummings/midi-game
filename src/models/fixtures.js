define(['data/constants', 'models/physics'], function(constants, physics) {
    var leftPlane = physics.createPlane([1, 0], constants.BORDER);
    var topPlane = physics.createPlane([0, 1], constants.BORDER);
    var rightPlane = physics.createPlane([-1, 0], constants.WIDTH - constants.BORDER);
    
    var bottomLeftCorner = physics.createPoint(constants.CORNER, constants.HEIGHT - constants.CORNER);
    var topLeftCorner = physics.createPoint(constants.CORNER, constants.HEIGHT - constants.CORNER);
    var topRightCorner = physics.createPoint(constants.CORNER, constants.HEIGHT - constants.CORNER);
    var bottomRightCorner = physics.createPoint(constants.CORNER, constants.HEIGHT - constants.CORNER);
    
    var planes = [topPlane, leftPlane, rightPlane,
        bottomLeftCorner, topLeftCorner, topRightCorner, bottomRightCorner];
    
    return {
        init: function() {
            return {
                getCollisionObjects: function() { return planes; }
            };
        }
    };
});