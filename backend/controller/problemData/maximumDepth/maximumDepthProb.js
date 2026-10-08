import mongoose from "mongoose";

const starterCodeMaxDepth = `function maxDepth(root) {
  // Write your code here
};`;

const maximumDepthProblem = [
  {
    id: 8,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",

    problemStatement: `<p className='mt-3'>
      Given the <strong>root</strong> of a binary tree, return its <strong>maximum depth</strong>.
    </p>
    <p className='mt-3'>
      The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
    </p>`,

    // will be replaced dynamically during seeding
    examples: [
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4010"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4011"),
    ],

    constraints: `
      <li className='mt-2'><code>The number of nodes in the tree is in the range [0, 10^4]</code></li>
      <li className='mt-2'><code>-100 ≤ Node.val ≤ 100</code></li>
    `,

    order: 8,

    starterCode: starterCodeMaxDepth,

    handlerFunction: `function handleMaxDepth(maxDepth, assert) {
      function TreeNode(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
      }

      const tests = [
        new TreeNode(3,
          new TreeNode(9),
          new TreeNode(20, new TreeNode(15), new TreeNode(7))
        ),
        null,
        new TreeNode(1, null, new TreeNode(2))
      ];

      const answers = [3, 0, 2];

      for (let i = 0; i < tests.length; i++) {
        const result = maxDepth(tests[i]);
        assert.strictEqual(result, answers[i]);
      }
      return true;
    }`,
  },
];

export default maximumDepthProblem;
