# simpleSim

The algorithm simpleSim provides a metric to approximately compare strings.

Arguments:
- needle
- haystack
- threshold = 0 (allows early exit when it is clear, that the result will not be able to achieve the threshold value

The function returns a value between 0 (nothing in common) and 1 (needle is completely contained in haystack and starts at the beginning.

simpleSim can be used to replacde other string comparaison metrics (Levenshtein Distance, Jaro-Winkler, Longest Common Sequence LCS.

The algorithm is straightforward, gives comparable results, is faster and has less complexity. While worst case is O(nm) the average complexity is near O(n). Also, the space complecity is O(1).

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

## Key Features

- Order Preservation: The function ensures that characters in needle are matched in order within haystack.
- Distance Sensitivity: Matches that are closer together contribute more to the score.
- Threshold Check: Allows early termination if the threshold cannot be met, improving efficiency.

## Comparison with other algorithms

### Levenshstein

- simpleSim focuses on matching characters in order and rewards matches that are closer together, while Levenshtein considers all possible edits.
- simpleSim is more efficient for long strings because it can terminate early if the threshold is not met.
- Levenshtein is more general-purpose, while simpleSim is tailored for specific use cases where order and proximity matter.

### Jaro- Winkler

- Both algorithms reward matches that are closer together, but simpleSim explicitly calculates a score based on the distance between matches.
- Jaro-Winkler is better suited for short strings and names, while simpleSim can handle longer strings more efficiently.
- simpleSim does not account for transpositions, whereas Jaro-Winkler does.

### Longest Common Subsequence (LCS)

- Both algorithms focus on matching characters in order, but simpleSim also considers the proximity of matches, rewarding closer matches with a higher score.
- LCS only returns the length of the longest common subsequence, while simpleSim provides a normalized score that can be compared against a threshold.
- simpleSim is more efficient for long strings due to its early termination mechanism.

### **Summary Table**

| Feature                     | simpleSim                     | Levenshtein Distance          | Jaro-Winkler                  | Longest Common Subsequence (LCS) |
|-----------------------------|----------------------------------|-------------------------------|-------------------------------|----------------------------------|
| **Order Preservation**       | Yes                              | No (edits can reorder)        | Yes (with transpositions)     | Yes                              |
| **Proximity Sensitivity**    | Yes (rewards closer matches)     | No                            | No                            | No                               |
| **Transpositions**           | No                               | No                            | Yes                           | No                               |
| **Threshold Support**        | Yes                              | No                            | No                            | No                               |
| **Efficiency**               | High (early termination)         | Low (dynamic programming)     | Medium                        | Low (dynamic programming)        |
| **Best Use Case**            | Long strings, ordered matches   | General-purpose, small edits  | Short strings, names          | Sequences with gaps              |

### Average-Case Complexity

| Algorithm            | Worst-Case Complexity | Average-Case Complexity       | Notes                                      |
|----------------------|-----------------------|-------------------------------|--------------------------------------------|
| **simpleSim**        | O(n × m)             | Often better than O(n × m)    | Early termination and proximity checks improve performance. |
| **Levenshtein**      | O(n × m)             | O(n × m)                      | Early stopping optimizations can help, but matrix must still be filled. |
| **Jaro-Winkler**     | O(n × m)             | O(n + m)                      | Matching window and linear processing improve performance. |
| **LCS**              | O(n × m)             | O(n × m)                      | No significant average-case improvements.  |


simpleSim benefits significantly from early termination and proximity checks. Average-case complexity can approach **O(n)** if matches are frequent and close together.

Jaro-Winkler benefits from a limited matching window and linear processing. Average-case complexity is often **O(n + m)**.

Levenshtein and LCS: Average-case complexity remains **O(n × m)** because they must process the entire dynamic programming matrix in most cases.. Optimizations like early stopping (for Levenshtein) can help in specific scenarios but do not change the overall complexity.

## Notes

simpleSim is asymetric, optimised to search a needle in a haystack. If you want to compare two strings to get their similarity, you should run the function both ways an take the average result.

If you use the function in search context, you may want to preprocess the strings to get low case only and handle special characters. This is not part of this algorithmn.

simpleSim is used in the project https://github.com/bellenuit/SLOOKUP

DeepSeek was used for part of this documenation. https://belle-nuit.com/how-deepseek-explained-the-simplesim-algorithm-and-found-an-oddity-in-it

2025-02 14 Matthias Bürcher
