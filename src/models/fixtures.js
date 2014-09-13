define(['data/dimensions', 'models/physics'], function(d, physics) {
    'use strict';
    var leftPlane = physics.createPlane('FIXTURE', [1, 0], d.BORDER);
    var topPlane = physics.createPlane('FIXTURE', [0, 1], d.BORDER);
    var rightPlane = physics.createPlane('FIXTURE', [-1, 0], d.WIDTH - d.BORDER);
    
    var bottomLeftCorner = physics.createPoint('FIXTURE', d.CORNER, d.HEIGHT - d.CORNER);
    var topLeftCorner = physics.createPoint('FIXTURE', d.CORNER, d.HEIGHT - d.CORNER);
    var topRightCorner = physics.createPoint('FIXTURE', d.CORNER, d.HEIGHT - d.CORNER);
    var bottomRightCorner = physics.createPoint('FIXTURE', d.CORNER, d.HEIGHT - d.CORNER);
    
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