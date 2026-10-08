const jumpGameExample = [
  {
    id: 1,
    inputText: "nums = [2,3,1,1,4]",
    outputText: "true",
    explanation: "Jump 1 step to index 1, then 3 steps to the last index.",
  },
  {
    id: 2,
    inputText: "nums = [3,2,1,0,4]",
    outputText: "false",
    explanation:
      "You always stop at index 3, which has 0 jump length. Can't reach last index.",
  },
];

export default jumpGameExample;
