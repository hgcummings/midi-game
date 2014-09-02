define(['models/maths'], function(maths) {
    return {
        /**
         * Calculate the reflection vector based on the
         * incident velocity and the unit normal
         */
        reflectionV: function(v, n) {
            var vn = maths.dotProduct(v, n);
            return [
                v[0] - 2 * n[0] * vn,
                v[1] - 2 * n[1] * vn
            ];
        }
    };
});
