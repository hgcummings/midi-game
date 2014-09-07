define(['data/dimensions', 'models/physics'], function(d, physics) {
    var leftPlane = physics.createPlane([1, 0], d.BORDER);
    var topPlane = physics.createPlane([0, 1], d.BORDER);
    var rightPlane = physics.createPlane([-1, 0], d.WIDTH - d.BORDER);
    
    var bottomLeftCorner = physics.createPoint(d.CORNER, d.HEIGHT - d.CORNER);
    var topLeftCorner = physics.createPoint(d.CORNER, d.HEIGHT - d.CORNER);
    var topRightCorner = physics.createPoint(d.CORNER, d.HEIGHT - d.CORNER);
    var bottomRightCorner = physics.createPoint(d.CORNER, d.HEIGHT - d.CORNER);
    
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