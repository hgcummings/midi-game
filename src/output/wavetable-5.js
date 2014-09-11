/** @license http://chromium.googlecode.com/svn/trunk/samples/audio/index.html
 Copyright 2009, Google Inc.
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above
 copyright notice, this list of conditions and the following disclaimer
 in the documentation and/or other materials provided with the
 distribution.
 * Neither the name of Google Inc. nor the names of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
define(function() {
    return {
        'uncompress': function(number) { return number / 100000; },
        'real': [0,12677,1797,-1823,-57,1813,-190,294,-732,586,95,129,-184,-206,121,-75,125,-189,-208,174,-20,17,-88,224,-241,223,218,-327,324,-95,-102,218,-308,212,-215,-129,259,-215,-294,250,272,-108,90,188,-274,278,-276,151,-102,-127,143,-248,261,-191,131,-26,-123,215,-236,223,-98,60,32,-44,182,-193,52,-68,-30,131,-185,159,-164,65,-61,-76,74,-151,138,-118,80,72,-84,120,-144,122,-118,-29,-42,-136,43,-135,113,-64,-37,92,-113,22,-127,126,-64,20,-1,-105,-124,-124,111,-95,-100,12,-112,89,-105,-69,111,-92,-60,-103,9,-62,49,-22,-82,20,-110,-21,-110,-89,-100,-97,-102,-104,-101,-101,-92,-68,-103,-81,-101,-76,-84,-102,-62,-86,-100,-100,-93,-99,-98,-80,-90,-98,-94,-97,-91,-75,-97,-80,-87,-80,-86,-78,-86,-86,-82,-78,-85,-85,-85,-82,-74,-84,-84,-80,-79,-83,-83,-79,-81,-76,-79,-70,-78,-81,-80,-74,-80,-78,-74,-76,-76,-64,-76,-74,-74,-76,-74,-74,-75,-76,-74,-69,-73,-75,-74,-74,-74,-74,-71,-73,-74,-73,-72,-71,-71,-69,-67,-63,-60,-56,-48,-44,-34,-28,-17,-9,1,10,18,27,35,42,47,53,58,61,63,64,62,63,62,62,63,63,62,62,62,62,61,61,61,62,60,60,61,61,60,59,60,60,59,58,59,60,59,58,59,60,58,57,58,59,57,57,58,59,57,56,58,58,57,56,57,58,56,55,57,57,56,55,56,57,55,54,56,57,55,54,56,56,55,53,55,56,54,53,55,56,54,53,55,55,54,52,54,55,53,52,54,55,53,52,54,55,53,51,53,54,52,51,53,54,52,51,53,54,52,51,53,53,52,50,52,53,51,50,52,53,51,50,52,53,51,50,52,52,50,49,51,52,50,49,51,52,50,49,51,52,50,49,51,51,49,48,50,51,49,48,50,51,49,48,50,51,49,48,50,50,49,47,49,50,48,47,49,50,48,47,49,50,48,47,49,49,48,47,48,49,48,46,48,49,47,46,48,49,47,46,48,49,47,46,48,48,47,46,47,48,47,45,47,48,46,45,47,48,46,45,47,47,46,45,47,47,46,45,46,47,46,44,46,47,45,44,46,47,45,44,46,46,45,44,46,46,45,44,45,46,45,44,45,46,45,44,45,46,44,43,45,46,44,43,45,45,44,43,45,45,44,43,44,45,44,43,44,45,44,42,44,44,44,42,45,46,46,45,46,47,46,45,46,47,46,44,46,47,46,44,46,47,45,44,46,46,45,44,46,46,45,44,46,46,45,44,45,46,45,44,45,46,45,44,45,46,45,43,45,45,44,43,45,45,44,43,45,45,44,43,44,45,44,43,44,45,44,43,44,45,44,42,44,44,44,42,44,44,43,42,44,44,43,42,44,44,43,42,43,44,43,42,43,44,43,42,43,44,43,42,43,43,43,41,43,43,42,41,43,43,42,41,43,43,42,41,42,43,42,41,42,43,42,41,42,43,42,41,42,42,42,41,42,42,42,41,42,42,41,40,42,42,41,40,42,42,41,40,41,42,41,40,41,42,41,40,41,42,41,40,41,41,41,40,41,41,41,40,42,42,42,41,42,42,42,41,42,42,42,41,42,42,41,40,42,42,41,40,42,42,41,40,41,42,41,40,41,42,41,40,41,41,41,40,41,41,41,40,41,41,41,40,41,41,41,40,41,41,40,39,41,41,40,39,41,41,40,39,40,41,40,39,40,41,40,39,40,40,40,39,40,40,40,39,40,40,40,39,40,40,40,39,40,40,39,39,40,40,39,38,40,40,39,38,39,40,39,38,39,40,39,38,39,39,39,38,39,39,39,38,39,39,39,38,39,39,39,38,39,39,39,38,39,39,39,38,39,39,38,38,39,39,38,37,39,39,38,37,38,39,38,37,38,38,38,37,38,38,38,37,38,38,38,37,38,38,38,37,38,38,38,37,38,38,38,37,38,38,38,37,38,38,37,37,38,38,37,37,38,38,37,36,37,38,37,36,37,37,37,36,37,37,37,36,37,37,37,36,37,37,37,36,37,37,37,36,37,37,37,36,37,37,37,36,37,37,37,36,37,37,36,36,37,37,36,36,37,37,36,36,36,37,36,35,36,36,36,35,36,36,36,35,36,36,36,35,36,36,36,35,36,36,36,35,36,36,36,35,36,36,36,35,36,36,36,35,36,36,36,35,36,36,35,35,36,36,35,35,36,36,35,35,35,35,35,34,35,35,35,34,35,35,35,34,35,35,35,34,35,35,35,34,35,35,35,34,35,35,35,34,35,35,35,34,35,35,35,34,35,35,35,34,35,35,35,34,35,35,34,34,35,35,34,34,35,35,33,34,34,34,34,34,34,34,34,33,34,34,34,33,34,34,34,34,34,34,34,34,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,34,33,33,34,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,32,33,33,33,33,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,34,35,35,35,34,35,35,35,34,35,35,35,34,35,35,34,34,35,35,34,34,34,34,34,34,34,34,34,34,34,34,34,33,34,34,34,34,34,34,34,33,34,34,34,34,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,32,33,33,33,32,33,33,33,33,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,32,33,32,33,33,33,32,33,32,33,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,31,32,32,32,32,32,32,32,31,32,32,32,31,32,32,32,31,32,32,32,32,32,32,32,31,32,32,32,31,32,32,32,31,32,32,32,31,32,32,32,31,32,32,32,31,32,32,32,31,32,31,32,31,32,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,33,33,33,33,32,33,33,33,33,33,33,33,33,33,33,33,32,33,33,33,33,33,33,33,33,33,33,33,32,33,33,33,33,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,32,33,32,33,33,33,32,33,32,33,32,33,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,31,32,32,32,32,32,32,32,31,32,32,30,30,32,32,32,31,32,32,32,31,32,32,32,31,32,32,32,31,32,32,32,31,32,32,32,31,32,31,32,31,31,31,32,32,31,31,32,31,32,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,33,34,34,34,33,34,34,34,33,34,34,34,33,34,33,34,33,34,33,34,33,34,33,34,33,34,33,34,33,34,33,34,33,34,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,32,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,33,33,32,33,32,33,32,33,33,33,32,33,32,33,32,33,32,33,32,33,32,33,32,33,32,33,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,31,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,36,37,37,37,37,37,37,37,36,37,37,37,37,37,37,37,37,37,37,37,36,37,37,37,36,37,37,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,37,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,35,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,35,36,36,36,35,36,35,36,36,36,36,36,36,36,40,41,40,41,40,41,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,39,40,39,40,39,40,39,40,39,40,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36],
        'imag': [0,-4906,-6626,5304,-364,1612,-1670,-366,218,251,381,-263,143,-105,195,209,-175,89,-17,139,245,336,-350,315,292,-297,183,-74,-63,310,-302,225,-79,-231,222,-286,168,-216,-66,161,-109,279,-281,223,-92,66,59,-235,257,-242,230,-101,47,157,-207,241,-207,104,-14,-72,211,-223,226,-223,108,83,-202,195,-203,131,-2,91,78,-169,141,-133,132,-7,-58,90,-125,128,-120,81,11,-66,72,-134,130,6,128,0,-71,117,-127,94,-65,128,-27,27,111,-126,127,-70,-18,-16,-56,80,-73,122,49,-83,61,-99,46,-76,103,59,118,100,106,115,-82,114,34,-113,31,71,36,44,-29,18,27,27,-49,79,5,64,20,-68,58,-5,-80,-52,-10,-11,-36,-5,-14,58,39,-4,27,-4,35,-62,-2,36,11,35,-9,37,6,0,26,-35,-11,6,0,22,40,8,1,25,25,4,1,26,15,31,22,41,23,0,12,33,7,4,23,14,13,43,9,19,21,6,18,16,7,3,12,29,17,1,11,9,-3,-9,20,6,0,10,14,16,15,23,26,36,40,45,53,56,63,66,69,71,71,70,68,65,61,56,51,46,39,33,30,26,20,16,16,17,14,13,15,17,15,14,17,19,16,14,18,20,16,15,18,20,17,15,19,21,17,15,19,21,17,14,19,21,17,14,19,22,17,14,19,22,17,14,19,22,17,14,19,22,17,13,19,22,16,13,19,22,16,13,19,22,16,13,19,21,16,12,19,21,16,12,18,21,15,12,18,21,15,12,18,21,15,11,18,21,15,11,18,21,15,11,18,20,14,11,17,20,14,10,17,20,14,10,17,20,14,10,17,20,13,9,16,20,13,9,16,19,13,9,16,19,13,9,16,19,13,9,16,19,12,8,15,19,12,8,15,19,12,8,15,18,12,8,15,18,12,8,15,18,11,7,14,18,11,7,14,18,11,7,14,17,11,7,14,17,11,7,14,17,11,6,13,17,11,6,13,17,10,6,13,17,10,6,13,17,10,6,13,16,10,6,13,16,10,5,13,16,10,5,12,16,9,5,12,16,9,5,12,16,9,5,12,16,9,4,12,15,9,4,12,15,9,4,11,15,9,4,11,15,9,4,11,15,9,4,11,15,8,4,11,15,8,3,11,15,8,3,11,15,8,3,10,14,8,3,10,13,8,3,10,14,5,8,10,15,14,10,10,14,8,3,11,15,8,3,10,15,8,3,10,15,8,3,10,14,7,3,10,14,7,3,10,14,8,2,10,14,7,2,10,14,7,2,10,14,7,3,10,14,7,2,9,14,7,2,9,13,7,2,9,13,7,2,9,14,7,2,9,13,7,1,9,13,7,2,9,13,7,2,9,13,7,1,9,13,6,2,9,13,7,1,8,13,7,2,8,13,6,1,8,13,6,1,8,13,6,1,8,13,6,1,8,12,6,1,8,12,6,0,8,12,6,1,8,12,6,1,8,12,6,1,7,12,6,1,8,12,6,1,7,11,6,1,7,12,5,0,7,12,5,0,7,11,5,0,7,11,5,0,7,11,5,0,7,11,5,0,7,11,5,0,7,12,5,0,7,11,5,0,7,11,5,1,7,11,5,0,7,11,5,0,6,11,5,0,7,11,5,0,7,11,5,0,6,11,5,0,6,11,5,0,7,11,4,0,6,11,5,0,6,11,4,0,6,10,4,0,6,10,4,0,6,10,5,0,6,11,4,0,6,10,4,0,6,10,4,0,6,11,4,0,6,10,4,0,6,10,4,0,5,10,4,0,5,10,4,0,6,10,4,0,5,10,4,0,6,10,4,0,5,10,4,0,5,9,4,0,5,10,4,0,5,10,4,0,5,10,4,0,5,10,4,-1,5,9,3,0,5,9,4,-1,5,9,4,0,5,10,3,0,5,9,3,0,5,9,3,0,4,9,3,0,5,9,4,-1,5,10,3,-1,5,9,3,-1,5,9,3,-1,5,9,3,0,4,9,3,-1,4,9,3,-1,4,9,3,-1,5,9,3,-1,4,9,3,-1,4,8,3,-1,4,9,3,-1,4,9,3,-1,4,9,3,-1,4,8,3,-1,5,8,3,-1,4,8,3,0,4,7,3,-1,4,8,3,-1,4,8,3,-1,3,8,3,-2,3,7,3,0,3,8,3,-1,4,9,3,-1,4,9,3,0,4,8,3,0,4,9,3,-1,4,8,3,-1,4,8,2,-2,3,8,2,-1,4,8,3,-2,4,9,3,-1,3,8,3,-2,4,8,2,-1,3,8,3,-1,3,8,3,-1,4,8,3,-2,4,7,2,-2,3,7,3,-2,4,8,2,-1,3,8,2,-2,4,8,4,-2,5,7,2,0,8,7,1,1,9,3,3,-3,3,7,1,-1,3,9,2,-2,2,8,2,-2,2,7,3,-3,3,6,3,-1,2,7,2,-2,3,7,2,-1,3,6,2,-2,3,7,2,-2,3,8,2,-2,3,7,2,-2,3,8,2,-1,3,7,2,-2,4,7,2,-2,3,7,2,-2,3,7,2,-2,2,6,2,-1,3,7,2,-2,3,7,2,-2,3,6,2,0,2,7,2,0,2,7,2,-2,3,7,2,-2,3,7,2,-1,3,7,2,-2,2,7,2,-1,3,7,1,-2,2,7,2,-4,2,6,2,-2,2,7,2,-2,3,7,2,-2,3,7,2,-2,3,7,2,-2,3,7,2,-3,2,7,2,-2,3,7,2,-3,2,7,1,-2,3,7,1,-3,2,6,2,-3,2,7,2,-2,3,7,2,-2,3,7,2,-3,3,7,1,-1,3,6,1,-2,2,6,2,-2,2,7,2,-2,2,6,2,-2,3,6,2,-3,3,7,2,-2,3,6,1,-2,2,7,2,-3,2,6,1,-2,2,7,2,-2,2,7,1,-3,2,6,1,-2,2,6,1,-3,2,7,1,-2,2,6,2,-2,2,5,1,-2,2,6,1,-2,2,6,1,-2,2,6,1,-2,2,5,1,-2,2,7,1,-2,2,6,1,-3,2,6,1,-2,2,6,1,-2,2,6,2,-3,2,5,3,-2,1,6,1,-3,1,6,1,-3,2,6,2,-2,2,6,0,-2,2,6,1,-2,2,7,1,-2,2,6,2,-3,2,7,1,-2,1,6,1,-2,1,6,1,-3,2,5,0,-3,1,5,1,-3,1,5,1,-2,2,6,1,-3,1,6,1,-2,1,6,1,-3,2,5,1,-3,1,6,1,-2,1,6,1,-2,2,7,1,-3,2,5,1,-3,2,7,1,-3,1,5,1,-2,2,6,1,-3,2,6,1,-2,1,7,1,-2,2,6,1,-3,2,6,1,-3,2,6,2,-2,1,6,1,-3,2,5,0,-4,1,6,1,-3,2,5,0,-2,2,5,1,-3,1,6,0,-3,1,7,1,-3,2,5,1,-3,1,5,1,-3,1,6,1,-2,1,6,0,-3,1,5,1,-3,2,5,1,-3,1,5,1,-3,1,6,1,-3,2,5,1,-4,1,6,1,-3,1,5,0,-3,1,4,1,-3,1,4,1,-3,1,5,0,-3,2,5,1,-3,1,5,1,-2,1,6,0,-3,1,5,0,-4,0,8,0,-1,10,10,-1,-3,1,5,1,-3,1,5,0,-3,2,6,1,-4,1,5,0,-2,1,5,1,-3,1,6,1,-4,1,5,2,-6,1,1,2,-4,1,6,0,-3,1,4,0,-3,0,5,2,-3,0,5,0,-3,1,5,1,-4,0,4,1,-4,0,6,0,-3,1,6,1,-2,1,6,1,-3,1,4,1,-4,0,5,0,-5,1,5,1,-3,3,2,-2,-2,4,4,1,-4,1,5,1,-3,0,5,0,-3,0,6,0,-4,2,6,0,-4,1,5,1,-3,1,5,0,-4,1,5,0,-4,1,6,0,-4,1,5,1,-5,1,7,1,-3,1,5,0,-3,1,4,1,-4,1,5,0,-3,0,6,1,-5,1,4,0,-2,0,5,0,-3,0,5,1,-4,0,3,0,-3,0,5,0,-5,0,5,0,-3,0,7,0,-3,2,6,0,-4,1,6,1,-4,1,4,0,-4,0,5,0,-3,1,6,1,-3,1,5,0,-4,1,5,1,-4,0,5,1,-3,1,5,0,-4,0,5,0,-3,0,5,0,-4,1,4,0,-2,1,5,0,-3,1,5,0,-3,0,5,0,-2,0,5,0,-4,0,5,0,-3,0,4,0,-5,0,4,0,-4,0,5,0,-4,0,5,0,-4,0,4,0,-3,-1,6,0,-4,0,4,0,-4,0,5,0,-4,1,5,0,-3,0,5,0,-4,0,5,0,-6,1,4,0,-5,0,6,0,-5,1,6,0,-5,0,6,0,-3,0,5,0,-4,0,5,1,-6,1,6,1,-4,0,5,0,-4,0,7,0,-5,0,5,0,-4,0,6,0,-5,0,5,0,-4,0,4,0,-5,1,6,0,-4,0,5,0,-4,0,5,0,-5,0,6,0,-5,0,5,0,-5,0,6,0,-4,0,5,0,-5,0,5,0,-4,0,5,0,-5,0,5,0,-5,0,5,0,-4,0,7,0,-4,0,5,0,-5,0,5,0,-4,0,5,0,-4,0,6,0,-4,0,5,0,-4,0,6,0,-8,0,5,0,0,0,5,0,-3,0,5,0,-5,1,4,0,-5,0,4,0,-5,0,5,0,-5,1,5,0,-5,0,6,0,-4,0,5,0,-6,0,3,0,-4,1,4,0,-4,0,7,0,-5,0,6,0,-4,0,5,0,-5,0,6,0,-7,0,5,0,-5,0,6,0,-3,0,5,-1,-5,0,5,0,-6,-1,5,1,-5,0,5,0,-5,2,7,4,-8,0,9,3,-9,0,7,0,-5,0,6,0,-4,0,3,0,-5,0,5,0,-3,0,5,0,-5,0,5,0,-5,0,5,1,-5,0,4,1,-4,0,5,0,-4,1,5,0,-3]
    };
});