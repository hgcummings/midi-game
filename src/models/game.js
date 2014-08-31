define(['models/level'], function(loader) {
    return {
        init: function(level) {
            var self = {};

            self.update = function() {};
            self.blocks = loader.load(level);

            return self;
        }
    }
});
