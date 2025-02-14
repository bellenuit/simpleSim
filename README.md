# simpleSim

The function simpleSim provides a metric to approximately compare strings.

Arguments:
- needle
- haystack
- thresold = 0 (allows early exit when it is clear, that the result will not be able to achieve the threshold value

The function returns a value between 0 (nothing in common) and 1 (needle is completely contained in haystack and starts at the beginning.

simpleSim can be used to replacde other string comparaison metrics (Levenshtein Distance, Jaro-Winkler, Longest Common Sequence LCS.

The algorithm is straightforward, gives comparable results, is faster and has less complexity. While worst case is O(nm) the average complexity is O(n).

See tests http://belle-nuit.com/site/files/similaritytest.html

The algorithm can be described as following:

- The score is set to 0.
- The offset is set to 1.
- The position is set to 0.
- The first character of needle is compared to the characters in the haystack starting at offset,
- If a match is found, the position is set to the position of the character in the haystack.
- A search back starting from offset-2 to the beginning is executed.
- If a match is found and the position is nearer to offset, that position is retained.
- If position is found, the score is augmented by 1/(abs(position-offset) + 1), means 1 for continous text and less in other cases,
- If there is a threshold and it is clear that the threshold cannot be achieved, the procedure is stopped early.
- The procedure is repeated for each character in the needle.
- The result is the score divided by the length of the needle.

simpleSim is asymetric, optimised to search a needle in a haystack. If you want to compare two strings to get their similarity, you should run the function both ways an take the average result.

If you use the function in search context, you may want to preprocess the strings to get low case only and handle special characters. This is not part of this algorithmn.

simpleSim is used in the project https://github.com/bellenuit/SLOOKUP

2025-02 14 Matthias Bürcher
