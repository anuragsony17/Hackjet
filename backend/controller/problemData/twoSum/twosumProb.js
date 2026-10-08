import mongoose from "mongoose";

const starterCodeTwoSum = `function twoSum(nums, target) {\n  // Write your code here\n}`;

const problem = [
  { 
    id: 1,
    title: "Two Sum",
    problemStatement: `<p className='mt-3'>
								Given an array of integers <code>nums</code> and an integer <code>target</code>, return
								<em>indices of the two numbers such that they add up to</em> <code>target</code>.
							</p>
							<p className='mt-3'>
								You may assume that each input would have <strong>exactly one solution</strong>, and you
								may not use thesame element twice.
							</p>
							<p className='mt-3'>You can return the answer in any order.</p>`,
    examples: [], // 👈 Example ka reference
    constraints: `<li className='mt-2'>
									<code>2 ≤ nums.length ≤ 10</code>
								</li>

								<li className='mt-2'>
									<code>-10 ≤ nums[i] ≤ 10</code>
								</li>
								<li className='mt-2'>
									<code>-10 ≤ target ≤ 10</code>
								</li>
								<li className='mt-2 text-sm'>
									<strong> Only one valid answer exists.</strong>
								</li> `,
    order: 1,
    difficulty: "Easy",
    starterCode: starterCodeTwoSum,
    handlerFunction:  `function handleTwo(twoSum, assert) {
    const nums = [
      [2, 7, 11, 15],
      [3, 2, 4],
      [3, 3],
      [1, 2],
      [-1, -2, -3, -4, -5],
      [-10, -2, 2, 10],
      Array.from({ length: 10000 }, (_, i) => i)
    ];

    const targets = [9, 6, 6, 3, -8, 0, 19998];

    const answers = [
      [0, 1],
      [1, 2],
      [0, 1],
      [0, 1],
      [2, 4],
      [1, 2],
      [9998, 9999]
    ];

    for (let i = 0; i < nums.length; i++) {
      const result = twoSum(nums[i], targets[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  }`,
  },

  
];

export default problem;
