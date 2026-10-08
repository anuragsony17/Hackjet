const maximumDepthExample = [
  {
    id: 1,
    inputText: "root = [3,9,20,null,null,15,7]",
    outputText: "3",
    explanation:
      "The longest path from root to leaf is 3 → 20 → 15 (or 7), so depth is 3.",
  },
  {
    id: 2,
    inputText: "root = []",
    outputText: "0",
    explanation: "The tree is empty, so the maximum depth is 0.",
  },
];

export default maximumDepthExample;
