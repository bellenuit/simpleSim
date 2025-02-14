# simpleSim

The algorithm simpleSim provides a metric to approximately compare strings.

Arguments:
- needle
- haystack
- thresold = 0 (allows early exit when it is clear, that the result will not be able to achieve the threshold value

The function returns a value between 0 (nothing in common) and 1 (needle is completely contained in haystack and starts at the beginning.

simpleSim can be used to replacde other string comparaison metrics (Levenshtein Distance, Jaro-Winkler, Longest Common Sequence LCS.

The algorithm is straightforward, gives comparable results, is faster and has less complexity. While worst case is O(nm) the average complexity is O(n).

See tests http://belle-nuit.com/site/files/similaritytest.html

## Algorithm

### Initial Checks:
If either needle or haystack is empty, the function returns 0.0 immediately.

### Character Matching:
For each character in needle, the function searches for a match in haystack:
- Forward Search: Starts from the current offset and searches forward in haystack for the character.
- Backward Search: If a match is found, the function also searches backward from the offset to see if a closer match exists. This is done to improve the score by minimizing the distance between matched characters.

### Score Calculation:
If a match is found, the score is incremented by 1 / (distance + 1), where distance is the absolute difference between the match position and the current offset. This rewards matches that are closer together.

The offset is updated to the position after the match to ensure characters are matched in order.

### Early Termination:
If the remaining possible score (current score + maximum possible score from remaining characters) is less than the scoreThreshold, the function returns 0 immediately, as the threshold cannot be met.

### Final Score:
The total score is normalized by dividing by needleLength and returned.

simpleSim is asymetric, optimised to search a needle in a haystack. If you want to compare two strings to get their similarity, you should run the function both ways an take the average result.

If you use the function in search context, you may want to preprocess the strings to get low case only and handle special characters. This is not part of this algorithmn.

simpleSim is used in the project https://github.com/bellenuit/SLOOKUP

2025-02 14 Matthias Bürcher
