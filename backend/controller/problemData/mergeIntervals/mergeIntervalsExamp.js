const mergeIntervalsExample = [
  {
    id: 1,
    inputText: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
    outputText: "[[1,6],[8,10],[15,18]]",
    explanation:
      "Intervals [1,3] and [2,6] overlap, merge into [1,6]. Others remain as is.",
  },
  {
    id: 2,
    inputText: "intervals = [[1,4],[4,5]]",
    outputText: "[[1,5]]",
    explanation: "Intervals [1,4] and [4,5] touch at 4, merge into [1,5].",
  },
];

export default mergeIntervalsExample;
