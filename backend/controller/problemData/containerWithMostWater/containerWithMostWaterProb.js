import mongoose from "mongoose";

const starterCodeContainer = `function maxArea(height) {
  // Write your code here
};`;

const containerWithMostWaterProblem = [
  {
    id: 6,
    title: "Container With Most Water",
    difficulty: "Medium",
    problemStatement: `<p className='mt-3'>
      You are given an integer array <code>height</code> where each element represents the height of a vertical line on the x-axis.
      Find two lines that together with the x-axis form a container that holds the most water.
    </p>
    <p className='mt-3'>Return <code>the maximum amount of water</code> a container can store.</p>`,

    // ✅ Example references (DB ObjectIds)
    examples: [
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4003"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4004"),
    ],

    constraints: `<li className='mt-2'><code>2 ≤ height.length ≤ 10^5</code></li>
    <li className='mt-2'><code>0 ≤ height[i] ≤ 10^4</code></li>`,

    order: 6,

    starterCode: starterCodeContainer,

    handlerFunction: `function handleContainer(maxArea, assert) {
      const tests = [
        [[1,8,6,2,5,4,8,3,7], 49],
        [[1,1], 1],
        [[4,3,2,1,4], 16],
        [[1,2,1], 2],
      ];

      for (let [input, expected] of tests) {
        const result = maxArea(input);
        assert.strictEqual(result, expected);
      }
      return true;
    }`,
  },
];

export default containerWithMostWaterProblem;
