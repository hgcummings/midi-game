define(function() {
    'use strict';
    var magnitude = function(v) {
        var m2 = 0;
        for (var i = 0; i < v.length; ++i) {
            m2 += (v[i] * v[i]);
        }
        return Math.sqrt(m2);
    };
    return {
        dotProduct: function(a, b) {
            var sum = 0;
            for (var i = 0; i < a.length && i < b.length; ++i) {
                sum += a[i] * b[i];
            }
            return sum;
        },
        magnitude: magnitude,
        cartesianDistance: function(a, b) {
            var sum = 0;
            for (var i = 0; i < a.length && i < b.length; ++i) {
                sum += (a[i] - b[i]) * (a[i] - b[i]);
            }
            return Math.sqrt(sum);
        },
        normalise: function(v) {
            var m = magnitude(v);
            var n = [];
            for (var i = 0; i < v.length; ++i) {
                n[i] = v[i] / m;
            }
            return n;
        }
    };
});
