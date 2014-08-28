define(['data/levels', 'models/level'], function(levels, loader) {
    return {
        init: function() {
            var self = {};

            self.update = function() {};
            self.blocks = loader.load(levels[0]);

            return self;            
        }
    }
});
