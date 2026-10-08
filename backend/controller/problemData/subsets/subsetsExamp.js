const subsetsExample = [
  {
    id: 1,
    inputText: "nums = [1,2,3]",
    outputText: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]",
    explanation:
      "All possible subsets of [1,2,3] are returned. Total subsets = 2³ = 8.",
  },
  {
    id: 2,
    inputText: "nums = [0]",
    outputText: "[[],[0]]",
    explanation:
      "An array with one element has two subsets: empty set and the element itself.",
  },
];

export default subsetsExample;
