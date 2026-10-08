import mongoose from "mongoose";

const starterCodeSubsets = `function subsets(nums) {
  // Write your code here
};`;

const subsetsProblem = [
  {
    id: 10,
    title: "Subsets",
    difficulty: "Medium",

    problemStatement: `<p className='mt-3'>
      Given an integer array <code>nums</code> of <strong>unique</strong> elements,
      return <strong>all possible subsets</strong> (the power set).
    </p>
    <p className='mt-3'>
      The solution set must not contain duplicate subsets. Return the solution in <strong>any order</strong>.
    </p>`,

    // will be replaced dynamically during seeding
    examples: [
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4030"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4031"),
    ],

    constraints: `
      <li className='mt-2'><code>1 ≤ nums.length ≤ 10</code></li>
      <li className='mt-2'><code>-10 ≤ nums[i] ≤ 10</code></li>
      <li className='mt-2'><code>All elements of nums are unique</code></li>
    `,
    order: 10,
    starterCode: starterCodeSubsets,

    handlerFunction: `function handleSubsets(subsets, assert) {
      const normalize = (arr) =>
        arr.map(sub => sub.slice().sort((a, b) => a - b))
           .sort((a, b) => a.length - b.length || a.join(',').localeCompare(b.join(',')));

      const tests = [
        [1, 2, 3],
        [0]
      ];

      const answers = [
        [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]],
        [[], [0]]
      ];

      for (let i = 0; i < tests.length; i++) {
        const result = subsets(tests[i]);
        assert.deepStrictEqual(
          normalize(result),
          normalize(answers[i])
        );
      }
      return true;
    }`,
  },
];

export default subsetsProblem;
