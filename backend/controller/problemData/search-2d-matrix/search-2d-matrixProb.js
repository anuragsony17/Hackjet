import mongoose from "mongoose";

const starterCodeSearch2DMatrix = `function searchMatrix(matrix, target) {
  // Write your code here
};`;

const search2DMatrixProblem = [
  {
    id: 5,
    title: "Search a 2D Matrix",
    difficulty: "Medium",

    problemStatement: `
      <p className='mt-3'>
        Write an efficient algorithm that searches for a value in an <code>m x n</code> matrix.
      </p>
      <li class='mt-3'>Integers in each row are sorted from left to right.</li>
      <li class='mt-3'>The first integer of each row is greater than the last integer of the previous row.</li>
      <p class='mt-3'>
        Return <code>true</code> if <code>target</code> exists in the matrix, otherwise return <code>false</code>.
      </p>
    `,

    // ✅ Example references
    examples: [
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4101"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4102"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4103"),
    ],

    constraints: `
      <li class='mt-2'><code>m == matrix.length</code></li>
      <li class='mt-2'><code>n == matrix[i].length</code></li>
      <li class='mt-2'><code>1 ≤ m, n ≤ 100</code></li>
      <li class='mt-2'><code>-10⁴ ≤ matrix[i][j], target ≤ 10⁴</code></li>
    `,

    order: 5,

    starterCode: starterCodeSearch2DMatrix,

    handlerFunction: `function handleSearchMatrix(searchMatrix, assert) {
      const tests = [
        {
          matrix: [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60],
          ],
          target: 3,
        },
        {
          matrix: [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60],
          ],
          target: 13,
        },
      ];

      const answers = [true, false];

      for (let i = 0; i < tests.length; i++) {
        const result = searchMatrix(tests[i].matrix, tests[i].target);
        assert.strictEqual(result, answers[i]);
      }

      return true;
    }`,
  },
];

export default search2DMatrixProblem;
