import mongoose from "mongoose";

const starterCodeJumpGame = `function canJump(nums) {
  // Write your code here
};`;

const jumpGameProblem = [
  {
    id: 3,
    title: "Jump Game",
    difficulty: "Medium",
    problemStatement: `<p className='mt-3'>
      You are given an integer array <code>nums</code>. You are initially positioned at the
      <strong> first index </strong> and each element in the array represents your maximum jump length.
    </p>
    <p className='mt-3'> Return <code>true</code> if you can reach the last index, otherwise <code>false</code>.</p>`,

    // ✅ Example references (DB ObjectIds)
    examples: [
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4001"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4002"),
    ],

    constraints: `<li className='mt-2'><code>1 ≤ nums.length ≤ 10^4</code></li>
    <li className='mt-2'><code>0 ≤ nums[i] ≤ 10^5</code></li>`,

    order: 3,

    starterCode: starterCodeJumpGame,

    handlerFunction: `function handleJump(canJump, assert) {
      const tests = [
        [2, 3, 1, 1, 4],
        [3, 2, 1, 0, 4],
        [2, 0, 0],
        [2, 5, 0, 0],
      ];

      const answers = [true, false, true, true];

      for (let i = 0; i < tests.length; i++) {
        const result = canJump(tests[i]);
        assert.strictEqual(result, answers[i]);
      }
      return true;
    }`,
  },
];

export default jumpGameProblem;
