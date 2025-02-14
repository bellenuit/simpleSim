/* simpleSim v 1.0 2025-02-14

MIT License

Copyright (c) 2025 Matthias Bürcher

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/


function simpleSim(needle, haystack, threshold = 0) {
  var score = 0.0;
  var offset = 0;
  const needleLength = needle.length;
  const scoreThreshold = threshold * needleLength;
  const haystackLength = haystack.length; 
  if (!needleLength) return 0.0; 
  if (!haystackLength) return 0.0; 
  for(var i = 0; i < needleLength; i++) {
    const n = needle.charAt(i);
    var position = -1;
    for (let forward = offset; forward < haystackLength + 1; forward++) {
      if (n == haystack.charAt(forward)) {
	    position = forward;
        break;
      }
    }
    // we search backward only as long as the result could be better than forward
    // ---------o---p----
    // ------l--o--------
    // the formula is offset - (position - offset) + 1
    const limit = (position > -1) ? Math.max(0,  * offset - position + 1) : 0;
    for (let backward = offset - 2; backward >= limit; backward--) {
      if (n == haystack.charAt(backward)) {
	    position = backward;
        break;
      }
    }
    if (position > -1) {
	    score += 1 / (Math.abs(position - offset) + 1);
	    offset = position + 1;
    }
  
    // if the threshold cannot be achieved any more, we stop
    // the score cannot become higher than 
    // score + (needleLength - i)
    if (score + (needleLength - i) < scoreThreshold) {
	    return 0;
    }
    
  }
  return score / needleLength;
}
