const search2DMatrixExample = [
  {
    id: 1,
    inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 3`,
    outputText: `true`,
    explanation: "3 is found in row 1, column 2",
    img: "/images/search-a-2d-1.jpg",
  },

  {
    id: 2,
    inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 13`,
    outputText: `false`,
    explanation: "13 does not exist in the matrix",
    img: "/images/search-a-2d-2.jpg",
  },

  {
    id: 3,
    inputText: `matrix = [[1]], target = 1`,
    outputText: `true`,
    explanation: "Single element 1 is equal to target",
  },
];

export default search2DMatrixExample;
